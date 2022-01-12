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
                        name="TRANSAÇÕES FINANCEIRAS"
                        links={[
                            {name: 'Listar', path: '/financialTransaction/list'},
                            {name: 'Criar', path: '/financialTransaction/'}
                        ]}
                    />

                    <Dropdown
                        name="CATEGORIAS"
                        links={[
                            {name: 'Listar', path: '/category/list'},
                            {name: 'Criar', path: '/category/'}
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