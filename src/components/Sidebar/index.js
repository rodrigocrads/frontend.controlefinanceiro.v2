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
                        name="Categorias"
                        links={[
                            {name: 'Listar', path: '/category/list'},
                            {name: 'Criar', path: '/category/'}
                        ]}
                    />

                    <Dropdown
                        name="Transações"
                        links={[
                            {name: 'Listar', path: '/financialTransaction/list'},
                            {name: 'Criar', path: '/financialTransaction/'}
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