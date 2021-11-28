import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateVariableRevenue } from '../../redux/actions/variableRevenueAction';
import VariableRevenueForm from '../../components/VariableRevenue/Form';
import icoMenuEdit from '../../img/edit.png';
import SaveOrUpdate from '../../builders/requestBody/variableFinancialTransaction/SaveOrUpdate';
import VariableExpense from '../../dtos/VariableExpense';
import { withRouter } from 'react-router';

class Create extends Component {
    onSubmitHandler(data) {
        const { id } = this.props.match.params;
        const builderContentRequest = new SaveOrUpdate(
            new VariableExpense({ ...data })
        );
        this.props.updateVariableRevenue(id, builderContentRequest.build());
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
                        <VariableRevenueForm
                            id={ this.props.match.params.id }
                            onSubmit={(data) => this.onSubmitHandler(data)}
                        />
                    </div>
                </div>
            </div>
        );
    };
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({ updateVariableRevenue }, dispatch)
);

export default withRouter(connect(null, mapDispatchToProps)(Create));