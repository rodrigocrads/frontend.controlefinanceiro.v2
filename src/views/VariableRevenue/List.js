import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import icoList from '../../img/ico-list.png';
import icoEdit from '../../img/edit.png';
import icoDelete from '../../img/delete.png';

export default class ViewVariableRevenueList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            variableRevenues: [],
        };
    }

    componentDidMount() {
        this.fetchCategories();
    }

    resetCategoriesList() {
        this.setState({ variableRevenues: [] });
        this.fetchCategories();
    }

    fetchCategories() {
        fetch('http://localhost:8000/api/variableRevenue')
            .then(response => response.json())
            .then(variableRevenues => this.setState({ ...this.state, variableRevenues }))
            .catch(e => { console.log(e) });
    }

    deleteCategoryHandler(categoryIndex) {
        const isConfirm = window.confirm("Realmente deseja excluir este registro?");
        if (isConfirm) {
            this.deleteCategory(categoryIndex);
        }
    }

    deleteCategory(categoryIndex) {
        fetch(`http://localhost:8000/api/variableRevenue/${ categoryIndex }`, { method: 'DELETE' })
            .then((response) => {
                if (response.status === 200) alert('Receita fixa excluida com sucesso.');

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
                        <th>CATEGORIA</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.variableRevenues.map((variableRevenue, index) => (
                            <tr key={ variableRevenue.id }>
                                <td>{ index + 1 }</td>
                                <td>{ variableRevenue.title }</td>
                                <td>{ variableRevenue.description || 'Não Informado' }</td>
                                <td>{ `R$ ${variableRevenue.value}` }</td>
                                <td>{ variableRevenue.category.name }</td>
                                <td>
                                    <Link className="table_action" to={`/variableRevenue/${ variableRevenue.id }`}><img src={ icoEdit } /></Link>

                                    <a href="#" onClick={ () => this.deleteCategoryHandler(variableRevenue.id) } className="table_action">
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
            <div>Nenhuma receita variável encontrada!</div>
        );
    }

    render() {
        return (
            <div>
                <div className="header_walk_links">
                    RECEITAS VARIÁVEIS / LISTAR
                </div>
                <div className="widget">
                    <div className="widget_header">
                        <img src={icoList} className="ico" alt="" />
                        Receitas variáveis
                    </div>

                    <div className="widget_content">
                        <div className="table_area">
                            {
                                this.state.variableRevenues.length > 0
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