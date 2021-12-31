import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createFinancialTransaction, clearSelectedFinancialTransaction } from '../../redux/actions/financialTransactionAction';
import FinancialTransactionForm from '../../components/FinancialTransaction/Form';
import icoMenuEdit from '../../img/edit.png';
import SaveOrUpdate from '../../builders/requestBody/financialTransaction/SaveOrUpdate';
import FinancialTransaction from '../../dtos/FinancialTransaction';

class Create extends Component {
    componentDidMount() {
        this.props.clearSelectedFinancialTransaction();
    }

    onSubmitHandler(data) {
        const builderContentRequest = new SaveOrUpdate(
            new FinancialTransaction({ ...data })
        );
        this.props.createFinancialTransaction(builderContentRequest.build());
    }

    render() {
        return (
            <div>
                <div className="header_walk_links">
                    TRANSAÇÕES / CRIAR
                </div>

                <div className="widget">
                    <div className="widget_header">
                        <img src={icoMenuEdit} className="ico" alt="Área de criação de registro de transação" />
                        Transação
                    </div>

                    <div className="widget_content">
                        <FinancialTransactionForm onSubmit={(data) => this.onSubmitHandler(data)} />
                    </div>
                </div>
            </div>
        );
    };
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        createFinancialTransaction,
        clearSelectedFinancialTransaction,
    }, dispatch)
);

export default connect(null, mapDispatchToProps)(Create);