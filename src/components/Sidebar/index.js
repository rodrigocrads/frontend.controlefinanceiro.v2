import { Link } from 'react-router-dom';

import icoDown from '../../img/down.png';

function Sidebar() {
    return (
        <div id="main_menu">
            <ul>
                <li><Link to="/">DASHBOARD</Link></li>
                <li className="dropdown">
                    <a onClick={() => { return false; }}>CATEGORIAS<img className="ico-dropdown" src={icoDown} alt="" /></a>
                    <ul className="menu_dropdown">
                        <li><Link to="/categoria/listar">LISTAR</Link></li>
                        <li><Link to="/categoria">CRIAR</Link></li>
                    </ul>
                </li>

                <li className="dropdown">
                    <a onClick={() => { return false; }}>RECEITAS FIXAS<img className="ico-dropdown" src={icoDown} alt="" /></a>
                    <ul className="menu_dropdown">
                        <li><Link to="/receitaFixa/listar">LISTAR</Link></li>
                        <li><Link to="/receitaFixa">CRIAR</Link></li>
                    </ul>
                </li>

                <li className="dropdown">
                    <a onClick={() => { return false; }}>DESPESAS FIXAS<img className="ico-dropdown" src={icoDown} alt="" /></a>
                    <ul className="menu_dropdown">
                        <li><Link to="/fixedExpense/list">LISTAR</Link></li>
                        <li><Link to="/fixedExpense">CRIAR</Link></li>
                    </ul>
                </li>

                <li className="dropdown">
                    <a onClick={() => { return false; }}>RECEITAS VARIÁVEIS<img className="ico-dropdown" src={icoDown} alt="" /></a>
                    <ul className="menu_dropdown">
                        <li><Link to="/variableRevenue/list">LISTAR</Link></li>
                        <li><Link to="/variableRevenue">CRIAR</Link></li>
                    </ul>
                </li>

                <li className="dropdown">
                    <a onClick={() => { return false; }}>DESPESAS VARIÁVEIS<img className="ico-dropdown" src={icoDown} alt="" /></a>
                    <ul className="menu_dropdown">
                        <li><Link to="/variableExpense/list">LISTAR</Link></li>
                        <li><Link to="/variableExpense">CRIAR</Link></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;