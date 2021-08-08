import React from 'react';
import Chart from "react-google-charts";

import BoxInfo from '../../components/UI/BoxInfo';

import { convertCurrencyToPtBr, replaceMonths } from '../../helpers/utils';

import icoCharBar from '../../img/chart_bar.png';
import icoCoinsAdd from '../../img/coins_add.png';
import icoCoins from '../../img/coins.png';
import icoCoinsDelete from '../../img/coins_delete.png';

const API_BASE_URL = "http://localhost:8000/api";

class ViewDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            monthTotals: {
                totalVariableExpense: 0.0,
                totalVariableRevenue: 0.0,
                totalFixedExpense: 0.0,
                totalFixedRevenue: 0.0,
            },
            yearTotals: [],
            expensesTotalsByCategoriesChart: [],
        };
    }

    componentDidMount() {
        this.fetchTotalsByCurrentMonth();
        this.fetchYearTotals();
        this.fetchExpensesTotalsByCategories();
    }

    async fetchTotalsByCurrentMonth() {
        await fetch(`${API_BASE_URL}/report/currentMonthTotals`)
            .then(response => response.json())
            .then(totals => this.setState( { ...this.state, monthTotals: { ...totals }}))
    }

    async fetchYearTotals() {
        await fetch(`${API_BASE_URL}/report/currentYearTotals`)
            .then(response => response.json())
            .then(data => {
                const totals = (data || []).map(monthTotal => {
                    const totals = monthTotal.totals;
                    const revenuesTotals = totals.totalFixedRevenue + totals.totalVariableRevenue;
                    const expensesTotals = totals.totalFixedExpense + totals.totalVariableExpense;

                    return [
                        replaceMonths(monthTotal.month),
                        revenuesTotals,
                        expensesTotals,
                        revenuesTotals - expensesTotals,
                    ];
                });

                this.setState( { ...this.state, yearTotals: [ ...totals ]})
            })
    }

    // todo: melhorar esta lógica
    async fetchExpensesTotalsByCategories() {
        await fetch(`${API_BASE_URL}/report/currentYearExpensesTotalsByCategories`)
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

                const totals = months.map(month => {
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

                    return [
                        replaceMonths(month.name),
                        ...baseCategories.map(category => category.total),
                    ];
                });

                const allCategoriesNames = Object.values(allCategories)
                    .map(category => category.name);

                this.setState( { ...this.state, expensesTotalsByCategoriesChart: [
                    [
                        'Mês',
                        ...allCategoriesNames,
                    ],
                    ...totals
                ]})
            });
    }

    renderMonthEconomy() {
        const monthTotals = this.state.monthTotals;
        const revenueTotal = monthTotals.totalFixedRevenue + monthTotals.totalVariableRevenue;
        const expenseTotal = monthTotals.totalFixedExpense + monthTotals.totalVariableExpense;

        return (
            <div className="widget">
                    <div className="widget_header">
                        <img src={icoCharBar} className="ico" alt="" />
                        Acumulado do mês atual
                    </div>

                    <div className="widget_content">

                        <BoxInfo
                            type="success"
                            title="Receita"
                            imgIco={icoCoinsAdd}
                            content={ convertCurrencyToPtBr(revenueTotal) }
                        />

                        <BoxInfo
                            type="danger"
                            title="Despesa"
                            imgIco={icoCoinsDelete}
                            content={ convertCurrencyToPtBr(expenseTotal) }
                        />

                        <BoxInfo
                            type="warning"
                            title="Economia"
                            imgIco={icoCoins}
                            content={ convertCurrencyToPtBr((revenueTotal - expenseTotal)) }
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
                    Evolução receita/despesa
                </div>

                <div className="widget_content">
                    <Chart
                        height={'300px'}
                        chartType="AreaChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Mês', 'Receitas', 'Despesas', 'Economia'],
                            ...this.state.yearTotals,
                        ]}
                        options={{
                            title: 'Evolução do total da receita e despesa do ano atual',
                            hAxis: { title: 'Mês', titleTextStyle: { color: '#333' } },
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
                        loader={<div>Loading Chart</div>}
                        data={[
                            ...this.state.expensesTotalsByCategoriesChart,
                        ]}
                        options={{
                            title: 'Totais de despesas por categorias de cada mês do ano corrente',
                            hAxis: { title: 'Mês', titleTextStyle: { color: '#333' } },
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