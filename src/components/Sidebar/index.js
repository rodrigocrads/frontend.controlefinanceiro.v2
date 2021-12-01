import React from 'react';
import { Link } from 'react-router-dom';

import Dropdown from './Dropdown';

export default class Sidebar extends React.Component {
    render() {
        return (
            <div id="main_menu">
                <ul>
                    <li><Link to="/">Dashboard</Link></li>

                    <Dropdown
                        name="Despesas Variáveis"
                        links={[
                            {name: 'Listar', path: '/variableExpense/list'},
                            {name: 'Criar', path: '/variableExpense/'}
                        ]}
                    />

                    <Dropdown
                        name="Receitas Variáveis"
                        links={[
                            {name: 'Listar', path: '/variableRevenue/list'},
                            {name: 'Criar', path: '/variableRevenue/'}
                        ]}
                    />

                    <Dropdown
                        name="Despesas Fixas"
                        links={[
                            {name: 'Listar', path: '/fixedExpense/list'},
                            {name: 'Criar', path: '/fixedExpense/'}
                        ]}
                    />

                    <Dropdown
                        name="Receitas Fixas"
                        links={[
                            {name: 'Listar', path: '/fixedRevenue/list'},
                            {name: 'Criar', path: '/fixedRevenue/'}
                        ]}
                    />

                    <Dropdown
                        name="Categorias"
                        links={[
                            {name: 'Listar', path: '/category/list'},
                            {name: 'Criar', path: '/category/'}
                        ]}
                    />
    
                    <li className="dropdown">
                        <Link to="/logout">Sair</Link>
                    </li>
                </ul>
            </div>
        );
    }
}