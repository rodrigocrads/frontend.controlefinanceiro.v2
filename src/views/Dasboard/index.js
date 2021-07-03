import React from 'react';

import BoxInfo from '../../components/UI/BoxInfo';

import { convertCurrencyToPtBr } from '../../helpers/utils';

import icoCharBar from '../../img/chart_bar.png';
import icoCoinsAdd from '../../img/coins_add.png';
import icoCoins from '../../img/coins.png';
import icoCoinsDelete from '../../img/coins_delete.png';

const API_BASE_URL = "http://localhost:8000/api";

class ViewDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            variableExpenseTotal: 0.0,
            variableRevenueTotal: 0.0,
            fixedExpenseTotal: 0.0,
            fixedRevenueTotal: 0.0,
        };
    }

    componentDidMount() {
        this.fetchTotalsByCurrentMonth();
    }

    async fetchTotalsByCurrentMonth() {
        await fetch(`${API_BASE_URL}/report/currentMonthTotals`)
            .then(response => response.json())
            .then(totals => this.setState({...this.state, ...totals}))
    }

    render() {
        const revenueTotal = this.state.fixedRevenueTotal + this.state.variableRevenueTotal;
        const expenseTotal = this.state.fixedExpenseTotal + this.state.variableExpenseTotal;

        return (
            <div>
                <div className="header_walk_links">
                    DASHBOARD
                </div>
                <div className="widget">
                    <div className="widget_header">
                        <img src={icoCharBar} className="ico" alt="" />
                        Economia do mês
                    </div>

                    <div className="widget_content">

                        <BoxInfo
                            type="success"
                            title="Receita total"
                            imgIco={icoCoinsAdd}
                            content={ convertCurrencyToPtBr(revenueTotal) }
                        />

                        <BoxInfo
                            type="danger"
                            title="Despesa total"
                            imgIco={icoCoinsDelete}
                            content={ convertCurrencyToPtBr(expenseTotal) }
                        />

                        <BoxInfo
                            type="warning"
                            title="Economia total"
                            imgIco={icoCoins}
                            content={ convertCurrencyToPtBr((revenueTotal - expenseTotal)) }
                        />

                    </div>
                </div>
            </div>
        );
    }
}

export default ViewDashboard;