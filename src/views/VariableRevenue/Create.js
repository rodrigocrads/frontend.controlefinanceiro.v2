import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createVariableRevenue, clearSelectedVariableRevenue } from '../../redux/actions/variableRevenueAction';
import { fetchCategoriesByType } from '../../redux/actions/categoryAction';
import VariableRevenueForm from '../../components/VariableRevenue/Form';
import icoMenuEdit from '../../img/edit.png';
import SaveOrUpdate from '../../builders/requestBody/variableFinancialTransaction/SaveOrUpdate';
import VariableExpense from '../../dtos/VariableExpense';

class Create extends Component {
    componentDidMount() {
        this.props.clearSelectedVariableRevenue();
        this.props.fetchCategoriesByType('revenue');
    }

    onSubmitHandler(data) {
        const builderContentRequest = new SaveOrUpdate(
            new VariableExpense({ ...data })
        );
        this.props.createVariableRevenue(builderContentRequest.build());
    }

    render() {
        return (
            <div>
                <div className="header_walk_links">
                    RECEITAS VARIÁVEIS / CRIAR
                </div>

                <div className="widget">
                    <div className="widget_header">
                        <img src={icoMenuEdit} className="ico" alt="Área de criação de registro de Receita variável" />
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
        createVariableRevenue,
        clearSelectedVariableRevenue,
        fetchCategoriesByType
    }, dispatch)
);

export default connect(null, mapDispatchToProps)(Create);