import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createVariableExpense, clearSelectedVariableExpense } from '../../redux/actions/variableExpenseAction';
import { fetchCategoriesByType } from '../../redux/actions/categoryAction';
import VariableExpenseForm from '../../components/VariableExpense/Form';
import icoMenuEdit from '../../img/edit.png';
import SaveOrUpdate from '../../builders/requestBody/variableFinancialTransaction/SaveOrUpdate';
import VariableExpense from '../../dtos/VariableExpense';

class Create extends Component {
    componentDidMount() {
        this.props.clearSelectedVariableExpense();
        this.props.fetchCategoriesByType('expense');
    }

    onSubmitHandler(data) {
        const builderContentRequest = new SaveOrUpdate(
            new VariableExpense({ ...data })
        );
        this.props.createVariableExpense(builderContentRequest.build());
    }

    render() {
        return (
            <div>
                <div className="header_walk_links">
                    DESPESAS VARIÁVEIS / CRIAR
                </div>

                <div className="widget">
                    <div className="widget_header">
                        <img src={icoMenuEdit} className="ico" alt="Área de criação de registro de despesa variável" />
                        Despesa variável
                    </div>

                    <div className="widget_content">
                        <VariableExpenseForm onSubmit={(data) => this.onSubmitHandler(data)} />
                    </div>
                </div>
            </div>
        );
    };
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        createVariableExpense,
        clearSelectedVariableExpense,
        fetchCategoriesByType
    }, dispatch)
);

export default connect(null, mapDispatchToProps)(Create);