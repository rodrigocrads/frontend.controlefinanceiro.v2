import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteVariableRevenue, fetchVariablesRevenues } from '../../redux/actions/variableRevenueAction';

import icoEdit from '../../img/edit.png';
import icoDelete from '../../img/delete.png';
import { convertCurrencyToPtBr, convertIsoDateToBr } from '../../helpers/utils';

class List extends Component {
    deleteHandler(id) {
        const isConfirm = window.confirm("Realmente deseja excluir este registro?");

        if (isConfirm) {
            this.props.deleteVariableRevenue(id);
        }
    }

    renderNotFound() {
        return <div>Nenhuma receita variável encontrada!</div>;
    }

    sumTotalValues() {
        return convertCurrencyToPtBr(this.props.variablesRevenues.reduce((total, item) => item.value + total, 0));
    }

    renderTable() {
        const { variablesRevenues } = this.props; 
        const foundLength = variablesRevenues.length;

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
                            variablesRevenues.map((variableRevenue, index) => (
                                <tr key={ variableRevenue.id }>
                                    <td>{ index + 1 }</td>
                                    <td>{ variableRevenue.title }</td>
                                    <td>{ variableRevenue.description || 'Não Informado' }</td>
                                    <td>{ convertCurrencyToPtBr(variableRevenue.value) }</td>
                                    <td>{ convertIsoDateToBr(variableRevenue.register_date) }</td>
                                    <td>{ variableRevenue.category.name }</td>
                                    <td>
                                        <Link className="table_action" to={`/variableRevenue/${ variableRevenue.id }`}>
                                            <img src={ icoEdit } />
                                        </Link>

                                        <a href="#" onClick={ () => this.deleteHandler(variableRevenue.id) } className="table_action">
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
        return this.props.variablesRevenues.length > 0
            ? this.renderTable()
            : this.renderNotFound();
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        deleteVariableRevenue,
        fetchVariablesRevenues,
}, dispatch));

const mapStateToProps = state => ({
    variablesRevenues: state.variableRevenue.all,
});

export default connect(mapStateToProps, mapDispatchToProps)(List);