import React from 'react';
import Chart from "react-google-charts";

import { convertCurrencyToPtBr, fetchWithAuth, replaceMonths, replateMonthToInitials } from '../../helpers/utils';

import CardInfo from '../../components/UI/CardInfo';

class ViewDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            monthTotals: {
                expense: 0.0,
                revenue: 0.0,
            },
            yearTotalsChartData: [],
            totalsExpensesByCategoriesChartData: [],
            totalMonthExpenseByCategoryChartData: [],
            totalMonthRevenueByCategoryChartData: [],
        };
    }

    componentDidMount() {
        this.fetchTotalsByCurrentMonth();
        this.fetchYearTotals();
        this.fetchExpensesTotalsByCategories();
        this.fetchCurrentMonthTotalExpenseByCategory();
        this.fetchCurrentMonthTotalRevenueByCategory();
    }

    async fetchTotalsByCurrentMonth() {
        await fetchWithAuth(`${process.env.REACT_APP_API_BASE_URL}report/currentMonthTotals`)
            .then(response => response.json())
            .then(totals => this.setState( { ...this.state, monthTotals: { ...totals }}))
    }

    async fetchYearTotals() {
        await fetchWithAuth(`${process.env.REACT_APP_API_BASE_URL}report/totalsByMonth`)
            .then(response => response.json())
            .then(data => {
                const totals = (Object.keys(data) || [])
                    .reduce((previousMonthsTotals, currentYear) => {
                        const totalsByMonth = data[currentYear]
                            .map(monthTotal => {
                                const totals = monthTotal.totals;
        
                                return [
                                    `${replateMonthToInitials(monthTotal.month)}/${currentYear}`,
                                    totals.revenue,
                                    totals.expense,
                                    totals.revenue - totals.expense,
                                ];
                            });

                        return previousMonthsTotals.concat(totalsByMonth);
                    }, []);

                this.setState( { ...this.state, yearTotalsChartData: [
                    ['Mês', 'Receitas', 'Despesas', 'Saldo'],
                    ...totals,
                ]})
            })
    }

    // todo: melhorar esta lógica
    async fetchExpensesTotalsByCategories() {
        await fetchWithAuth(`${process.env.REACT_APP_API_BASE_URL}report/totalExpenseByCategoryAndByMonth`)
            .then(response => response.json())
            .then(months => {
                const allCategories = [];

                (months || []).forEach(month => {
                    month.categories.forEach(category => {
                        const foundCategoryByName = allCategories.some(cat => cat.name === category.name);
        
                        if (!foundCategoryByName) {
                            allCategories.push({
                                name: category.name,
                                total: 0,
                            });
                        }
                    })
                });

                const totals = (months || []).map(month => {
                    let baseCategories = [...allCategories];

                    baseCategories.map(category => category.total = 0);

                    month.categories.forEach(category => {
                        baseCategories.map(baseCategory => {
                            if (baseCategory.name === category.name) {
                                baseCategory.total += category.total;
                                return baseCategory;
                            }

                            return baseCategory;
                        });
                    });

                    const baseCategoriesTotal = baseCategories.length > 0
                        ? baseCategories.map(category => category.total)
                        : [0];

                    return [
                        replaceMonths(month.month),
                        ...baseCategoriesTotal,
                    ];
                });

                const allCategoriesNames = allCategories.length > 0
                    ? Object.values(allCategories).map(category => category.name)
                    : ['Nenhuma Categoria Encontrada'];

                this.setState( { ...this.state, totalsExpensesByCategoriesChartData: [
                    [ 'Mês', ...allCategoriesNames ],
                    ...totals,
                ]})
            });
    }

    async fetchCurrentMonthTotalExpenseByCategory() {
        await fetchWithAuth(`${process.env.REACT_APP_API_BASE_URL}report/totalExpenseByCategory`)
            .then(response => response.json())
            .then(categories => {
                const data = categories.map(category => [ category.name, category.total ]);

                this.setState({
                    ...this.state, totalMonthExpenseByCategoryChartData: [
                        ["Categoria", "Valor Total"],
                        ...data,
                    ]
                });
            });
    }

    async fetchCurrentMonthTotalRevenueByCategory() {
        await fetchWithAuth(`${process.env.REACT_APP_API_BASE_URL}report/totalRevenueByCategory`)
            .then(response => response.json())
            .then(categories => {
                const data = categories.map(category => [ category.name, category.total ]);

                this.setState({
                    ...this.state, totalMonthRevenueByCategoryChartData: [
                        ["Categoria", "Valor Total"],
                        ...data,
                    ]
                });
            });
    }

    renderMonthEconomy() {
        const monthTotals = this.state.monthTotals;
        const totalRevenue = monthTotals.revenue || 0.0;
        const totalExpense = monthTotals.expense || 0.0;

        return (
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Balanço do mês atual</h3>

                    <div className="card-tools">
                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                            <i className="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div className="row">
                        <CardInfo
                            title="Total de Receita"
                            bgClass="bg-success"
                            value={convertCurrencyToPtBr(totalRevenue)}
                        />

                        <CardInfo
                            title="Total de Despesa"
                            bgClass="bg-danger"
                            value={convertCurrencyToPtBr(totalExpense)}
                        />

                        <CardInfo
                            title="Saldo"
                            bgClass="bg-warning"
                            value={convertCurrencyToPtBr((totalRevenue - totalExpense))}
                        />
                    </div>
                </div>
            </div>
        );
    }

    renderTotalsCurrentYearChart() {
        return (
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Receita/Despesa dos últimos 12 meses</h3>

                    <div className="card-tools">
                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                            <i className="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <Chart
                        height={'300px'}
                        chartType="AreaChart"
                        loader={<div>Carregando Gráfico...</div>}
                        data={ [ ...this.state.yearTotalsChartData ] }
                        options={{
                            title: 'Total da receita sobre despesa por mês nos últimos 12 meses',
                            hAxis: { title: 'Mês/Ano', titleTextStyle: { color: '#333' } },
                            vAxis: { minValue: 0 },
                            // For the legend to fit, we make the chart area smaller
                            chartArea: { width: '75%', height: '75%' },
                            // lineWidth: 25
                        }}
                    />
                </div>
            </div>
        );
    }

    renderTotalsCurrentYearExpensesTotalByCategoriesChart() {
        return (
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Total despesa por categoria dos últimos 12 meses</h3>

                    <div className="card-tools">
                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                            <i className="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <Chart
                        height={'300px'}
                        chartType="ColumnChart"
                        loader={<div>Carregando Gráfico...</div>}
                        data={ [ ...this.state.totalsExpensesByCategoriesChartData ] }
                        options={{
                            title: 'Totais de despesas por categoria de cada mês nos últimos 12 meses',
                            hAxis: { title: 'Meses', titleTextStyle: { color: '#333' } },
                            vAxis: { minValue: 0 },
                            // For the legend to fit, we make the chart area smaller
                            chartArea: { width: '75%', height: '75%' },
                            // lineWidth: 25
                        }}
                    />
                </div>
            </div>
        );
    }

    renderMonthTotalRevenueByCategoryChart() {
        return (
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Receita por categoria</h3>

                    <div className="card-tools">
                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                            <i className="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                <Chart
                    height={'250px'}
                    chartType="PieChart"
                    loader={<div>Carregando Gráfico...</div>}
                    data={ [ ...this.state.totalMonthRevenueByCategoryChartData ] }
                    options={{
                        //title: "Receita por categoria do mês",
                        is3D: false,
                    }}
                />
                </div>
            </div>
        );
    }

    renderMonthTotalExpenseByCategoryChart() {
        return (
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Despesa por categoria</h3>

                    <div className="card-tools">
                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                            <i className="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <Chart
                        height={'250px'}
                        chartType="PieChart"
                        loader={<div>Carregando Gráfico...</div>}
                        data={ [ ...this.state.totalMonthExpenseByCategoryChartData ] }
                        options={{
                            //title: "Despesa por categoria do mês",
                            is3D: false,
                        }}
                    />
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Dashboard</h1>
                            </div>
                        </div>
                    </div>
                </div>
                { this.renderMonthEconomy() }
                <div className="row">
                    <div className="col-md-6">
                        { this.renderMonthTotalRevenueByCategoryChart() }
                    </div>
                    <div className="col-md-6">
                        { this.renderMonthTotalExpenseByCategoryChart() }
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        { this.renderTotalsCurrentYearChart() }
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        { this.renderTotalsCurrentYearExpensesTotalByCategoriesChart() }
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewDashboard;
