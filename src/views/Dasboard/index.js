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
            yearTotals: []
        };
    }

    componentDidMount() {
        this.fetchTotalsByCurrentMonth();
        this.fetchYearTotals();
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

    render() {
        return (
            <div>
                <div className="header_walk_links">
                    DASHBOARD
                </div>
                { this.renderMonthEconomy() }
                { this.renderTotalsCurrentYearChart() }
            </div>
        );
    }
}

export default ViewDashboard;