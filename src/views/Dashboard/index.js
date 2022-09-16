import React from 'react';
import Chart from "react-google-charts";

import BoxInfo from '../../components/UI/BoxInfo';

import { convertCurrencyToPtBr, fetchWithAuth, replaceMonths, replateMonthToInitials } from '../../helpers/utils';

import icoCharBar from '../../img/chart_bar.png';
import icoCoinsAdd from '../../img/coins_add.png';
import icoCoins from '../../img/coins.png';
import icoCoinsDelete from '../../img/coins_delete.png';

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
        };
    }

    componentDidMount() {
        this.fetchTotalsByCurrentMonth();
        this.fetchYearTotals();
        this.fetchExpensesTotalsByCategories();
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
                    ['Mês', 'Receitas', 'Despesas', 'Economia'],
                    ...totals,
                ]})
            })
    }

    // todo: melhorar esta lógica
    async fetchExpensesTotalsByCategories() {
        await fetchWithAuth(`${process.env.REACT_APP_API_BASE_URL}report/currentYearExpensesTotalsByCategories`)
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

    renderMonthEconomy() {
        const monthTotals = this.state.monthTotals;
        const totalRevenue = monthTotals.revenue || 0.0;
        const totalExpense = monthTotals.expense || 0.0;

        return (
            <div className="widget">
                    <div className="widget_header">
                        Balanço do mês atual
                    </div>

                    <div className="widget_content">

                        <BoxInfo
                            type="success"
                            title="Receita"
                            imgIco={icoCoinsAdd}
                            content={ convertCurrencyToPtBr(totalRevenue) }
                        />

                        <BoxInfo
                            type="danger"
                            title="Despesa"
                            imgIco={icoCoinsDelete}
                            content={ convertCurrencyToPtBr(totalExpense) }
                        />

                        <BoxInfo
                            type="warning"
                            title="Economia"
                            imgIco={icoCoins}
                            content={ convertCurrencyToPtBr((totalRevenue - totalExpense)) }
                        />

                    </div>
                </div>
        );
    }

    renderTotalsCurrentYearChart() {
        return (
            <div className="widget">
                <div className="widget_header">
                    <img src={icoCharBar} className="ico" alt="" />
                    Receita/Despesa
                </div>

                <div className="widget_content">
                    <Chart
                        height={'300px'}
                        chartType="AreaChart"
                        loader={<div>Carregando Gráfico...</div>}
                        data={ [ ...this.state.yearTotalsChartData ] }
                        options={{
                            title: 'Total da receita sobre despesa dos últimos 12 meses',
                            hAxis: { title: 'Mês/Ano', titleTextStyle: { color: '#333' } },
                            vAxis: { minValue: 0 },
                            // For the legend to fit, we make the chart area smaller
                            chartArea: { width: '70%', height: '70%' },
                            // lineWidth: 25
                        }}
                    />
                </div>
            </div>
        );
    }

    renderTotalsCurrentYearExpensesTotalByCategoriesChart() {
        return (
            <div className="widget">
                <div className="widget_header">
                    <img src={icoCharBar} className="ico" alt="" />
                    Despesas por categoria
                </div>

                <div className="widget_content">
                    <Chart
                        height={'300px'}
                        chartType="ColumnChart"
                        loader={<div>Carregando Gráfico...</div>}
                        data={ [ ...this.state.totalsExpensesByCategoriesChartData ] }
                        options={{
                            title: 'Totais de despesas por categoria de cada mês',
                            hAxis: { title: 'Meses', titleTextStyle: { color: '#333' } },
                            vAxis: { minValue: 0 },
                            // For the legend to fit, we make the chart area smaller
                            chartArea: { width: '70%', height: '70%' },
                            // lineWidth: 25
                        }}
                    />
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div className="header_walk_links">
                    DASHBOARD
                </div>
                { this.renderMonthEconomy() }
                { this.renderTotalsCurrentYearChart() }
                { this.renderTotalsCurrentYearExpensesTotalByCategoriesChart() }
            </div>
        );
    }
}

export default ViewDashboard;