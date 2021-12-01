import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateVariableRevenue, clearSelectedVariableRevenue, getVariableRevenueById } from '../../redux/actions/variableRevenueAction';
import { fetchCategoriesByType } from '../../redux/actions/categoryAction';
import VariableRevenueForm from '../../components/VariableRevenue/Form';

import SaveOrUpdate from '../../builders/requestBody/variableFinancialTransaction/SaveOrUpdate';
import VariableExpense from '../../dtos/VariableExpense';
import icoMenuEdit from '../../img/edit.png';

class Update extends Component {
    componentDidMount() {
        this.props.clearSelectedVariableRevenue();
        this.props.fetchCategoriesByType('revenue');

        if (!!this.props.match.params.id) {
            this.props.getVariableRevenueById(this.props.match.params.id);
        }
    }

    onSubmitHandler(data) {
        const builderContentRequest = new SaveOrUpdate( new VariableExpense({ ...data }));

        this.props.updateVariableRevenue(this.props.match.params.id, builderContentRequest.build());
        this.props.getVariableRevenueById(this.props.match.params.id);
    }

    render() {
        return (
            <div>
                <div className="header_walk_links">
                    RECEITAS VARIÁVEIS / ATUALIZAR
                </div>

                <div className="widget">
                    <div className="widget_header">
                        <img src={icoMenuEdit} className="ico" alt="Área de atualização do registro de receita variável" />
                        Receita variável
                    </div>

                    <div className="widget_content">
                        <VariableRevenueForm onSubmit={(data) => this.onSubmitHandler(data)} />
                    </div>
                </div>
            </div>
        );
    };
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        updateVariableRevenue,
        fetchCategoriesByType,
        clearSelectedVariableRevenue,
        getVariableRevenueById,
    }, dispatch)
);

export default withRouter(connect(null, mapDispatchToProps)(Update));