import logo from '../../img/logo.png';
import icoList from '../../img/ico-list.png';

function Top() {
    return (
        <div id="topo">
            <div id="logo_area">
                <div className="logo">
                    <a href="index.html"><img src={logo} alt="LOGO" /></a>
                </div>
            </div>
            <div id="main_title">
                <h1>Sistema Controle Financeiro</h1>
            </div>
            <div id="ico_menu_mobile">
                <a href="#" id="link_menu_mobile"><img src={icoList} alt="Profile" /></a>
            </div>
        </div>
    );
}

export default Top;