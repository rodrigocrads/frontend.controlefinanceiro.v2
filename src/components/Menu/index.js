import icoDown from '../../img/down.png';

function Menu() {
    return (
        <div id="main_menu">
            <ul>
                <li><a href="index.html">DASHBOARD</a></li>
                <li><a href="formulario.html">FORMULÁRIOS</a></li>
                <li><a href="tabela.html">TABELAS</a></li>
                <li><a href="login.html">LOGIN</a></li>
                <li><a href="colunas.html">COLUNAS</a></li>
                <li className="dropdown">
                    <a href="#" onclick="return false;">MENU DROP DOWN 1<img className="ico-dropdown" src={icoDown} alt="" /></a>
                    <ul className="menu_dropdown">
                        <li><a href="#">DROPDOWN 1</a></li>
                        <li><a href="#">DROPDOWN 2</a></li>
                    </ul>
                </li>
                <li className="dropdown">
                    <a href="#" onclick="return false;">MENU DROP DOWN 2<img className="ico-dropdown" src={icoDown} alt="" /></a>
                    <ul className="menu_dropdown">
                        <li><a href="#">DROPDOWN 1</a></li>
                        <li><a href="#">DROPDOWN 2</a></li>
                    </ul>
                </li>
                <li className="dropdown">
                    <a href="#" onclick="return false;">MENU DROP DOWN 2<img className="ico-dropdown" src={icoDown} alt="" /></a>
                    <ul className="menu_dropdown">
                        <li><a href="#">DROPDOWN 1</a></li>
                        <li><a href="#">DROPDOWN 2</a></li>
                    </ul>
                </li>
                <li className="dropdown">
                    <a href="#" onclick="return false;">MENU DROP DOWN 2<img className="ico-dropdown" src={icoDown} alt="" /></a>
                    <ul className="menu_dropdown">
                        <li><a href="#">DROPDOWN 1</a></li>
                        <li><a href="#">DROPDOWN 2</a></li>
                    </ul>
                </li>
                <li className="dropdown">
                    <a href="#" onclick="return false;">MENU DROP DOWN 2<img className="ico-dropdown" src={icoDown} alt="" /></a>
                    <ul className="menu_dropdown">
                        <li><a href="#">DROPDOWN 1</a></li>
                        <li><a href="#">DROPDOWN 2</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}

export default Menu;