import React from 'react';
import { Link } from 'react-router-dom';
import UserData from '../UserData';

class Sidebar extends React.Component {
    render() {
        return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <Link to="/" className="brand-link">
                    <img
                        src="/dist/img/logo.png"
                        alt="Logo do Sistema Controle Financeiro"
                        className="brand-image img-circle elevation-3"
                        style={{ opacity: ".8" }}
                    />
                    <span className="brand-text font-weight-light">Controle Financeiro</span>
                </Link>

                <div className="sidebar">
                    <UserData />

                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="true">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">
                                    <i className="nav-icon fas fa-tachometer-alt"></i>
                                    <p>
                                        Dashboard
                                    </p>
                                </Link>
                            </li>

                            <li className="nav-item">                                
                                <a href="#" className="nav-link">
                                    <i className="nav-icon fas fa-coins"></i>
                                    <p>
                                        Lançamentos
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="/entry/list" className="nav-link">
                                            <i className="nav-icon fas fa-list"></i>
                                            <p>
                                                Listar
                                            </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/entry" className="nav-link">
                                            <i className="nav-icon fas fa-plus"></i>
                                            <p>
                                                Novo
                                            </p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item">                                
                                <a href="#" className="nav-link">
                                    <i className="nav-icon fas fa-wallet"></i>
                                    <p>
                                        Categorias
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="/category/list" className="nav-link">
                                            <i className="nav-icon fas fa-list"></i>
                                            <p>
                                                Listar
                                            </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/category" className="nav-link">
                                            <i className="nav-icon fas fa-plus"></i>
                                            <p>
                                                Novo
                                            </p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        );
    }
}

export default Sidebar;