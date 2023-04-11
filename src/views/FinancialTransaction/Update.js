import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    updateFinancialTransaction,
    clearSelectedFinancialTransaction,
    getFinancialTransactionById
} from '../../redux/actions/financialTransactionAction';
import { fetchCategoriesByType } from '../../redux/actions/categoryAction';
import FinancialTransactionForm from '../../components/FinancialTransaction/Form';

import SaveOrUpdate from '../../builders/requestBody/financialTransaction/SaveOrUpdate';
import FinancialTransaction from '../../dtos/FinancialTransaction';
import icoMenuEdit from '../../img/edit.png';

class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldShowCategory: true
        };
    }

    componentDidMount() {
        this.props.clearSelectedFinancialTransaction();

        const id = this.props.match.params.id;
        if (id) {
            this.props.getFinancialTransactionById(id);
        }
    }

    onSubmitHandler(data) {
        const builderContentRequest = new SaveOrUpdate( new FinancialTransaction({ ...data }));

        const id = this.props.match.params.id;
        this.props.updateFinancialTransaction(id, builderContentRequest.build());
        this.props.getFinancialTransactionById(id);
    }

    onChangeTypeHandler(event) {
        const value = event.target.value;
        console.log(value);

        this.setState({ shouldShowCategory: value !== ''})

        if (value !== '') {
            this.props.fetchCategoriesByType(value);
        }
    }

    render() {
        return (
            <div>
                <div className="header_walk_links">
                    TRANSAÇÕES FINANCEIRAS / ATUALIZAR
                </div>

                <div className="widget">
                    <div className="widget_header">
                        <img src={icoMenuEdit} className="ico" alt="Área de atualização do registro de transação financeira" />
                        Transação financeira
                    </div>

                    <div className="widget_content">
                        <FinancialTransactionForm
                            shouldShowCategory={this.state.shouldShowCategory}
                            onChangeType={(event) => this.onChangeTypeHandler(event)}
                            onSubmit={(data) => this.onSubmitHandler(data)}
                        />
                    </div>
                </div>
            </div>
        );
    };
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        updateFinancialTransaction,
        fetchCategoriesByType,
        clearSelectedFinancialTransaction,
        getFinancialTransactionById,
    }, dispatch)
);

export default withRouter(connect(null, mapDispatchToProps)(Update));