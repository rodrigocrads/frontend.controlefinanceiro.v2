import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CategoryList from '../../components/Category/List';

export default class List extends Component {
    render() {
        return (
            <div>
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Lista de categorias</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                                <li className="breadcrumb-item">Categorias / Listar</li>
                            </ol>
                        </div>
                        </div>
                    </div>
                </div>

                <CategoryList />
            </div>
        );
    };
}