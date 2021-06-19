import React from 'react';

import BoxInfo from '../../components/UI/BoxInfo';

import { formatCurrencyValueToBR } from '../../helpers/viewsHelper';
import { sum } from '../../helpers/calculateHelper';

import icoCharBar from '../../img/chart_bar.png';
import icoCoinsAdd from '../../img/coins_add.png';
import icoCoins from '../../img/coins.png';
import icoCoinsDelete from '../../img/coins_delete.png';

const API_BASE_URL = "http://localhost:8000/api";

class ViewDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            variableExpenses: [],
            variableRevenues: [],
            fixedExpenses: [],
            fixedRevenues: [],
        };
    }

    componentDidMount() {
        this.fetchFixedExpenses();
        this.fetchFixedRevenues();
        this.fetchVariableExpenses();
        this.fetchVariableRevenues();
    }

    async fetchFixedRevenues() {
        await fetch(`${API_BASE_URL}/fixedRevenue?endDate=active`)
            .then(response => response.json())
            .then(fixedRevenues => this.setState({...this.state, fixedRevenues}))
    }

    async fetchVariableRevenues() {
        await fetch(`${API_BASE_URL}/variableRevenue`)
            .then(response => response.json())
            .then(variableRevenues => this.setState({...this.state, variableRevenues}))
    }

    async fetchFixedExpenses() {
        await fetch(`${API_BASE_URL}/fixedExpense?endDate=active`)
            .then(response => response.json())
            .then(fixedExpenses => this.setState({...this.state, fixedExpenses}))
    }

    async fetchVariableExpenses() {
        await fetch(`${API_BASE_URL}/variableExpense`)
            .then(response => response.json())
            .then(variableExpenses => this.setState({...this.state, variableExpenses}))
    }

    filterByExpirationDay(fixedRevenuesOrExpenses) {
        return (fixedRevenuesOrExpenses || [])
            .filter(revenueOrExpense => {
                const expirationDay = revenueOrExpense.activation_control.expiration_day || 0;
                const currentDay = (new Date()).getUTCDate();

                return expirationDay <= currentDay;
            });
    }

    render() {
        const fixedRevenues = this.filterByExpirationDay(this.state.fixedRevenues);
        const fixedExpenses = this.filterByExpirationDay(this.state.fixedExpenses);

        const sumRevenues = sum(fixedRevenues) + sum(this.state.variableRevenues);
        const sumExpenses = sum(fixedExpenses) + sum(this.state.variableExpenses);

        return (
            <div>
                <div className="header_walk_links">
                    Dashboard
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
                            content={ formatCurrencyValueToBR(sumRevenues) }
                        />

                        <BoxInfo
                            type="danger"
                            title="Despesa total"
                            imgIco={icoCoinsDelete}
                            content={ formatCurrencyValueToBR(sumExpenses) }
                        />

                        <BoxInfo
                            type="warning"
                            title="Economia total"
                            imgIco={icoCoins}
                            content={ formatCurrencyValueToBR((sumRevenues - sumExpenses)) }
                        />

                    </div>
                </div>
            </div>
        );
    }
}

export default ViewDashboard;