import React from 'react';
import { Link } from 'react-router-dom';

import Dropdown from './Dropdown';

export default class Sidebar extends React.Component {
    render() {
        return (
            <div id="main_menu">
                <ul>
                    <li><Link to="/">DASHBOARD</Link></li>

                    <Dropdown
                        name="CATEGORIAS"
                        links={[
                            {name: 'LISTAR', path: '/category/list'},
                            {name: 'CRIAR', path: '/category/'}
                        ]}
                    />

                    <Dropdown
                        name="RECEITAS FIXAS"
                        links={[
                            {name: 'LISTAR', path: '/fixedRevenue/list'},
                            {name: 'CRIAR', path: '/fixedRevenue/'}
                        ]}
                    />

                    <Dropdown
                        name="DESPESAS FIXAS"
                        links={[
                            {name: 'LISTAR', path: '/fixedExpense/list'},
                            {name: 'CRIAR', path: '/fixedExpense/'}
                        ]}
                    />

                    <Dropdown
                        name="RECEITAS VARIÁVEIS"
                        links={[
                            {name: 'LISTAR', path: '/variableRevenue/list'},
                            {name: 'CRIAR', path: '/variableRevenue/'}
                        ]}
                    />

                    <Dropdown
                        name="DESPESAS VARIÁVEIS"
                        links={[
                            {name: 'LISTAR', path: '/variableExpense/list'},
                            {name: 'CRIAR', path: '/variableExpense/'}
                        ]}
                    />
    
                    <li className="dropdown">
                        <Link to="/logout">SAIR</Link>
                    </li>
                </ul>
            </div>
        );
    }
}