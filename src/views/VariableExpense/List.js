import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import icoList from '../../img/ico-list.png';
import icoEdit from '../../img/edit.png';
import icoDelete from '../../img/delete.png';
import { convertIsoDateToBr } from '../../helpers/utils';

export default class ViewVariableExpenseList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            variableExpenses: [],
        };
    }

    componentDidMount() {
        this.fetchCategories();
    }

    resetCategoriesList() {
        this.setState({ variableExpenses: [] });
        this.fetchCategories();
    }

    fetchCategories() {
        fetch('http://localhost:8000/api/variableExpense')
            .then(response => response.json())
            .then(variableExpenses => this.setState({ ...this.state, variableExpenses }))
            .catch(e => { console.log(e) });
    }

    deleteCategoryHandler(categoryIndex) {
        const isConfirm = window.confirm("Realmente deseja excluir este registro?");
        if (isConfirm) {
            this.deleteCategory(categoryIndex);
        }
    }

    deleteCategory(categoryIndex) {
        fetch(`http://localhost:8000/api/variableExpense/${ categoryIndex }`, { method: 'DELETE' })
            .then((response) => {
                if (response.status === 200) alert('Despesa variável excluida com sucesso.');

                this.resetCategoriesList();
            })
            .catch((error) => console.log(error));
    }

    renderTable() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>TÍTULO</th>
                        <th>DESCRIÇÃO</th>
                        <th>VALOR</th>
                        <th>DATA DO REGISTRO</th>
                        <th>CATEGORIA</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.variableExpenses.map((variableExpense, index) => (
                            <tr key={ variableExpense.id }>
                                <td>{ index + 1 }</td>
                                <td>{ variableExpense.title }</td>
                                <td>{ variableExpense.description || 'Não Informado' }</td>
                                <td>{ `R$ ${variableExpense.value}` }</td>
                                <td>{ convertIsoDateToBr(variableExpense.register_date) }</td>
                                <td>{ variableExpense.category.name }</td>
                                <td>
                                    <Link className="table_action" to={`/variableExpense/${ variableExpense.id }`}><img src={ icoEdit } /></Link>

                                    <a href="#" onClick={ () => this.deleteCategoryHandler(variableExpense.id) } className="table_action">
                                        <img src={icoDelete} />
                                    </a> 
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    }

    renderNotFound() {
        return (
            <div>Nenhum registro encontrado!</div>
        );
    }

    render() {
        return (
            <div>
                <div className="header_walk_links">
                    DESPESAS VARIÁVEIS / LISTAR
                </div>
                <div className="widget">
                    <div className="widget_header">
                        <img src={icoList} className="ico" alt="" />
                        Despesas variáveis
                    </div>

                    <div className="widget_content">
                        <div className="table_area">
                            {
                                this.state.variableExpenses.length > 0
                                ? this.renderTable()
                                : this.renderNotFound()
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}