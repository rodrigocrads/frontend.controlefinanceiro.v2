import React, { Component } from 'react';

import icoList from '../../img/ico-list.png';
import icoEdit from '../../img/edit.png';
import icoDelete from '../../img/delete.png';

export default class CategoriaViewList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
        };
    }

    async componentDidMount() {
        await this.fetchCategories();
    }

    fetchCategories() {
        fetch('http://localhost:8000/api/category')
            .then(response => response.json())
            .then(categories => this.setState({ ...this.state, categories }))
            .catch(e => { console.log(e) });
    }

    render() {
        return (
            <div>
                <div className="header_walk_links">
                    CATEGORIA / LISTAR
                </div>
                <div className="widget">
                    <div className="widget_header">
                        <img src={icoList} className="ico" alt="" />
                        Lista de categorias
                    </div>

                    <div className="widget_content">
                        <div className="table_area">
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
                                        this.state.categories.map(category => (
                                            <tr key={ category.id + category.created_at}>
                                                <td>{ category.id }</td>
                                                <td>{ category.name }</td>
                                                <td>{ category.type }</td>
                                                <td>
                                                    <a href="#" className="table_action"><img src={icoEdit} /></a>
                                                    <a href="#" className="table_action"><img src={icoDelete} /></a>
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
        );
    };
}