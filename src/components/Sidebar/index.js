import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dropdown from './Dropdown';
import WelcomeUserData from '../WelcomeUserData';
import { togglSidebarShow } from '../../redux/actions/sidebarAction';

class Sidebar extends React.Component {
    close() {
        this.props.togglSidebarShow(false);
    }

    render() {
        const { isActive } = this.props;
        const displayBlock = { display: 'block' };

        return (
            <>
                <div 
                    id="fundo_total"
                    style={ isActive ? displayBlock : {}}
                    onClick={ () => this.close() }
                >
                </div>
                <div id="main_menu" style={ isActive ? displayBlock : {}}>
                    <WelcomeUserData />
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

                        <li><Link to="/accountConfigurations">CONFIGURAÇÕES</Link></li>

                        <li className="dropdown">
                            <Link to="/logout">LOGOUT</Link>
                        </li>
                    </ul>
                </div>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({ togglSidebarShow }, dispatch)
);

const mapStateToProps = (state) => ({
    isActive: state.sidebar.isActive,
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);