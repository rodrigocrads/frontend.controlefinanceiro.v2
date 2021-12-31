import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteFinancialTransaction, fetchFinancialTransactions } from '../../redux/actions/financialTransactionAction';

import icoEdit from '../../img/edit.png';
import icoDelete from '../../img/delete.png';
import { convertCurrencyToPtBr, convertIsoDateToBr, replaceFinancialTransactionType } from '../../helpers/utils';

class List extends Component {
    deleteHandler(id) {
        const isConfirm = window.confirm("Realmente deseja excluir este registro?");

        if (isConfirm) {
            this.props.deleteFinancialTransaction(id);
        }
    }

    renderNotFound() {
        return <div>Nenhuma transação encontrada!</div>;
    }

    sumTotalValuesByType(type) {
        const total = this.props.financialTransactions
            .filter(item => item.type === type)
            .reduce((total, item) => item.value + total, 0);

        return convertCurrencyToPtBr(total);
    }

    lengthByType(type) {
        return this.props.financialTransactions.filter(item => item.type === type).length;
    }

    renderTable() {
        const { financialTransactions } = this.props; 
        const foundLength = financialTransactions.length;
        const foundRevenueTypeLength = this.lengthByType('revenue');
        const foundExpenseTypeLength = this.lengthByType('expense');

        return (
            <>
                <p>Encontrados um total de: <b>{ foundLength <= 1  ? `${foundLength} registro` : `${foundLength} registros` }</b>.</p>
                <p><b>{foundRevenueTypeLength}</b> { foundRevenueTypeLength <= 1 ? 'registro' : 'registros'} do tipo <b>receita</b>, valor total de: <b style={{ color: 'green' }}>{this.sumTotalValuesByType('revenue')}</b></p>
                <p><b>{foundExpenseTypeLength}</b> { foundExpenseTypeLength <= 1 ? 'registro' : 'registros'} do tipo <b>despesa</b>, valor total de: <b style={{ color: 'red' }}>{this.sumTotalValuesByType('expense')}</b></p>
                <br />
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tipo</th>
                            <th>Categoria</th>
                            <th>Título</th>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Data do registro</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            financialTransactions.map((financialTransaction, index) => (
                                <tr key={ financialTransaction.id }>
                                    <td>{ index + 1 }</td>
                                    <td>{ replaceFinancialTransactionType(financialTransaction.type) }</td>
                                    <td>{ financialTransaction.category.name }</td>
                                    <td>{ financialTransaction.title }</td>
                                    <td>{ financialTransaction.description || 'Não Informado' }</td>
                                    <td>{ convertCurrencyToPtBr(financialTransaction.value) }</td>
                                    <td>{ convertIsoDateToBr(financialTransaction.register_date) }</td>
                                    <td>
                                        <Link className="table_action" to={`/financialTransaction/${ financialTransaction.id }`}>
                                            <img src={ icoEdit } />
                                        </Link>

                                        <a href="#" onClick={ () => this.deleteHandler(financialTransaction.id) } className="table_action">
                                            <img src={icoDelete} />
                                        </a> 
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </>
        );
    }

    render() {
        return this.props.financialTransactions?.length > 0
            ? this.renderTable()
            : this.renderNotFound();
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        deleteFinancialTransaction,
        fetchFinancialTransactions,
}, dispatch));

const mapStateToProps = state => ({
    financialTransactions: state.financialTransaction.all,
});

export default connect(mapStateToProps, mapDispatchToProps)(List);