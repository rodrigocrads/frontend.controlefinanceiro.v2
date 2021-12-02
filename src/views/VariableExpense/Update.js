import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateVariableExpense, clearSelectedVariableExpense, getVariableExpenseById } from '../../redux/actions/variableExpenseAction';
import { fetchCategoriesByType } from '../../redux/actions/categoryAction';
import VariableExpenseForm from '../../components/VariableExpense/Form';

import SaveOrUpdate from '../../builders/requestBody/variableFinancialTransaction/SaveOrUpdate';
import VariableExpense from '../../dtos/VariableExpense';
import icoMenuEdit from '../../img/edit.png';

class Update extends Component {
    componentDidMount() {
        this.props.clearSelectedVariableExpense();
        this.props.fetchCategoriesByType('expense');

        if (!!this.props.match.params.id) {
            this.props.getVariableExpenseById(this.props.match.params.id);
        }
    }

    onSubmitHandler(data) {
        const builderContentRequest = new SaveOrUpdate( new VariableExpense({ ...data }));

        this.props.updateVariableExpense(this.props.match.params.id, builderContentRequest.build());
        this.props.getVariableExpenseById(this.props.match.params.id);
    }

    render() {
        return (
            <div>
                <div className="header_walk_links">
                    DESPESAS VARIÁVEIS / ATUALIZAR
                </div>

                <div className="widget">
                    <div className="widget_header">
                        <img src={icoMenuEdit} className="ico" alt="Área de atualização do registro de despesa variável" />
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
        updateVariableExpense,
        fetchCategoriesByType,
        clearSelectedVariableExpense,
        getVariableExpenseById,
    }, dispatch)
);

export default withRouter(connect(null, mapDispatchToProps)(Update));