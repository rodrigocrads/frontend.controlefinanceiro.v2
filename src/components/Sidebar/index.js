import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Dropdown from './Dropdown';

class Sidebar extends React.Component {
    render() {
        const { isActive } = this.props;
        const displayBlock = { display: 'block' };

        return (
            <>
                <div id="fundo_total" style={ isActive ? displayBlock : {}}></div>
                <div id="main_menu" style={ isActive ? displayBlock : {}}>
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
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    isActive: state.sidebar.isActive,
});

export default connect(mapStateToProps, null)(Sidebar);