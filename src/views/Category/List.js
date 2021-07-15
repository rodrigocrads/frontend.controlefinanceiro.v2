import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import icoList from '../../img/ico-list.png';
import icoEdit from '../../img/edit.png';
import icoDelete from '../../img/delete.png';
import FlashMessage from '../../components/UI/FlashMessage';

export default class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            errors: [],
        };
    }

    componentDidMount() {
        this.fetchCategories();
    }

    resetCategoriesList() {
        this.setState({ categories: [] });
        this.fetchCategories();
    }

    fetchCategories() {
        fetch(`${process.env.REACT_APP_API_BASE_URL}category`)
            .then(response => response.json())
            .then(categories => this.setState({ ...this.state, categories }));
    }

    deleteCategoryHandler(categoryIndex) {
        const isConfirm = window.confirm("Realmente deseja excluir este registro?");
        if (isConfirm) {
            this.deleteCategory(categoryIndex);
        }
    }

    errorMessagesByField(response, field) {
        return response[field];
    }

    deleteCategory(categoryIndex) {
        fetch(`${process.env.REACT_APP_API_BASE_URL}category/${categoryIndex}`, { method: 'DELETE' })
            .then((response) => {
                if (response.status === 200) {
                    alert('Categoria excluida com sucesso.');
                }

                if(response.status === 422) {
                    response.json()
                        .then(data => this.setState({
                            errors : this.errorMessagesByField(data, 'id')
                        }));
                }

                this.resetCategoriesList();
            });
    }

    renderTable() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>NOME</th>
                        <th>TIPO</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.categories.map((category, index) => (
                            <tr key={ category.id }>
                                <td>{ index + 1 }</td>
                                <td>{ category.name }</td>
                                <td>{ category.type === 'expense' ? 'Despesa' : 'Receita' }</td>
                                <td>
                                    <Link className="table_action" to={`/category/${category.id}`}><img src={icoEdit} /></Link>

                                    <a href="#" onClick={ () => this.deleteCategoryHandler(category.id) } className="table_action">
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

    renderNotFoundCategories() {
        return (
            <div>Nenhuma categoria encontrada!</div>
        );
    }

    showErrorsMessage() {
        return this.state.errors.map(error => (
            <FlashMessage
                type="danger"
                title="Atenção!"
                description={error}
            />
        ));
    }

    render() {
        return (
            <div>
                <div className="header_walk_links">
                    CATEGORIAS / LISTAR
                </div>
                <div className="widget">
                    <div className="widget_header">
                        <img src={icoList} className="ico" alt="" />
                        Lista de categorias
                    </div>

                    <div className="widget_content">
                        <div className="table_area">
                            { this.showErrorsMessage() }
                            {
                                this.state.categories.length > 0
                                    ? this.renderTable()
                                    : this.renderNotFoundCategories()
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}