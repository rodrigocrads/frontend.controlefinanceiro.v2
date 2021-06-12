import { Link } from 'react-router-dom';

import icoDown from '../../img/down.png';

function Sidebar() {
    return (
        <div id="main_menu">
            <ul>
                <li><Link to="/">DASHBOARD</Link></li>
                <li className="dropdown">
                    <a href="#" onClick="return false;">CATEGORIAS<img className="ico-dropdown" src={icoDown} alt="" /></a>
                    <ul className="menu_dropdown">
                        <li><Link to="/categoria">LISTAR</Link></li>
                        <li><Link to="/categoria/criar">CRIAR</Link></li>
                    </ul>
                </li>
                <li className="dropdown">
                    <a href="#" onClick="return false;">RECEITAS FIXAS<img className="ico-dropdown" src={icoDown} alt="" /></a>
                    <ul className="menu_dropdown">
                        <li><Link to="/receitaFixa">LISTAR</Link></li>
                        <li><Link to="/receitaFixa/criar">CRIAR</Link></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;