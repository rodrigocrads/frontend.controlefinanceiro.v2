import icoDown from '../../img/down.png';

function Sidebar() {
    return (
        <div id="main_menu">
            <ul>
                <li><a href="index.html">DASHBOARD</a></li>
                <li className="dropdown">
                    <a href="#" onclick="return false;">CATEGORIAS<img className="ico-dropdown" src={icoDown} alt="" /></a>
                    <ul className="menu_dropdown">
                        <li><a href="#">CRIAR</a></li>
                        <li><a href="#">LISTAR</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;