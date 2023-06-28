import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteEntry, fetchEntries } from '../../redux/actions/entryAction';

import { convertCurrencyToPtBr, convertIsoDateToBr, replaceEntryType } from '../../helpers/utils';

class List extends Component {
    deleteHandler(id) {
        const isConfirm = window.confirm("Realmente deseja excluir este registro?");

        if (isConfirm) {
            this.props.deleteEntry(id);
        }
    }

    renderNotFound() {
        return <div>Nenhuma transação financeira encontrada!</div>;
    }

    sumTotalValuesByType(type) {
        const total = this.props.entries
            .filter(item => item.type === type)
            .reduce((total, item) => item.value + total, 0);

        return convertCurrencyToPtBr(total);
    }

    lengthByType(type) {
        return this.props.entries.filter(item => item.type === type).length;
    }

    renderTable() {
        const { entries } = this.props; 
        const foundLength = entries.length;
        const foundRevenueTypeLength = this.lengthByType('revenue');
        const foundExpenseTypeLength = this.lengthByType('expense');

        return (
            <>
                <p>
                    Encontrados um total de: <b>{ foundLength <= 1  ? `${foundLength} registro` : `${foundLength} registros` }</b>.<br />
                    <b>{foundRevenueTypeLength}</b> { foundRevenueTypeLength <= 1 ? 'registro' : 'registros'} do tipo <b>receita</b>, valor total de: <b style={{ color: 'green' }}>{this.sumTotalValuesByType('revenue')}</b><br />
                    <b>{foundExpenseTypeLength}</b> { foundExpenseTypeLength <= 1 ? 'registro' : 'registros'} do tipo <b>despesa</b>, valor total de: <b style={{ color: 'red' }}>{this.sumTotalValuesByType('expense')}</b>
                </p>
                <p></p>

                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body table-responsive p-0">
                                <table className="table table-hover text-nowrap">
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
                                        entries.map((entry, index) => (
                                            <tr key={ entry.id }>
                                                <td>{ index + 1 }</td>
                                                <td>{ replaceEntryType(entry.type) }</td>
                                                <td>{ entry.category.name }</td>
                                                <td>{ entry.title }</td>
                                                <td>{ entry.description || 'Não Informado' }</td>
                                                <td>{ convertCurrencyToPtBr(entry.value) }</td>
                                                <td>{ convertIsoDateToBr(entry.register_date) }</td>
                                                <td>
                                                    <Link
                                                        className="btn btn-info btn-rounded btn-sm waves-effect waves-light"
                                                        to={`/entry/${ entry.id }`}
                                                    >
                                                        Editar
                                                    </Link>

                                                    <a
                                                        href="#"
                                                        onClick={ () => this.deleteHandler(entry.id) }
                                                        className="btn btn-danger btn-sm btn-rounded buttonDelete waves-effect waves-light ml-1"
                                                    >
                                                        Excluir
                                                    </a> 
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    render() {
        return this.props.entries?.length > 0
            ? this.renderTable()
            : this.renderNotFound();
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        deleteEntry,
        fetchEntries,
}, dispatch));

const mapStateToProps = state => ({
    entries: state.entry.all,
});

export default connect(mapStateToProps, mapDispatchToProps)(List);