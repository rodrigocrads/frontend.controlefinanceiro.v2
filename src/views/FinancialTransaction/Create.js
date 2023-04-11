import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCategoriesByType } from '../../redux/actions/categoryAction';
import { createFinancialTransaction, clearSelectedFinancialTransaction } from '../../redux/actions/financialTransactionAction';
import FinancialTransactionForm from '../../components/FinancialTransaction/Form';
import icoMenuEdit from '../../img/edit.png';
import SaveOrUpdate from '../../builders/requestBody/financialTransaction/SaveOrUpdate';
import FinancialTransaction from '../../dtos/FinancialTransaction';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldShowCategory: false
        };
    }

    componentDidMount() {
        this.props.clearSelectedFinancialTransaction();
    }

    onSubmitHandler(data) {
        const builderContentRequest = new SaveOrUpdate(
            new FinancialTransaction({ ...data })
        );
        this.props.createFinancialTransaction(builderContentRequest.build());
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
                    TRANSAÇÕES FINANCEIRAS / CRIAR
                </div>

                <div className="widget">
                    <div className="widget_header">
                        <img src={icoMenuEdit} className="ico" alt="Área de criação de registro de transação" />
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
        createFinancialTransaction,
        clearSelectedFinancialTransaction,
        fetchCategoriesByType
    }, dispatch)
);

export default connect(null, mapDispatchToProps)(Create);