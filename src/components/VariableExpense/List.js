import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteVariableExpense, fetchVariablesExpenses } from '../../redux/actions/variableExpenseAction';

import icoEdit from '../../img/edit.png';
import icoDelete from '../../img/delete.png';
import { convertCurrencyToPtBr, convertIsoDateToBr } from '../../helpers/utils';

class List extends Component {
    deleteHandler(id) {
        const isConfirm = window.confirm("Realmente deseja excluir este registro?");

        if (isConfirm) {
            this.props.deleteVariableExpense(id);
        }
    }

    renderNotFound() {
        return <div>Nenhuma receita variável encontrada!</div>;
    }

    sumTotalValues() {
        return convertCurrencyToPtBr(this.props.variablesExpenses.reduce((total, item) => item.value + total, 0));
    }

    renderTable() {
        const { variablesExpenses } = this.props; 
        const foundLength = variablesExpenses.length;

        return (
            <>
                <p>Encontrados: <b>{ foundLength === 1 ? `${foundLength} registro` : `${foundLength} registros` }</b>, com o valor total de: <b>{ this.sumTotalValues() }</b>.</p>
                <br />
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Título</th>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Data do registro</th>
                            <th>Categoria</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            variablesExpenses.map((variableExpense, index) => (
                                <tr key={ variableExpense.id }>
                                    <td>{ index + 1 }</td>
                                    <td>{ variableExpense.title }</td>
                                    <td>{ variableExpense.description || 'Não Informado' }</td>
                                    <td>{ convertCurrencyToPtBr(variableExpense.value) }</td>
                                    <td>{ convertIsoDateToBr(variableExpense.register_date) }</td>
                                    <td>{ variableExpense.category.name }</td>
                                    <td>
                                        <Link className="table_action" to={`/variableExpense/${ variableExpense.id }`}>
                                            <img src={ icoEdit } />
                                        </Link>

                                        <a href="#" onClick={ () => this.deleteHandler(variableExpense.id) } className="table_action">
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
        return this.props.variablesExpenses?.length > 0
            ? this.renderTable()
            : this.renderNotFound();
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        deleteVariableExpense,
        fetchVariablesExpenses,
}, dispatch));

const mapStateToProps = state => ({
    variablesExpenses: state.variableExpense.all,
});

export default connect(mapStateToProps, mapDispatchToProps)(List);