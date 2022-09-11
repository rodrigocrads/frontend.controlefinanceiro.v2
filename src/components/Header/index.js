import MenuMobileControl from '../MenuMobileControl';
import HeaderUserData from '../HeaderUserData';

function Header() {
    return (
        <div id="topo">
            <div id="logo_area">
                <div className="logo">
                    {/* <Link to="/"><img src={logo} alt="LOGO" /></Link> */}
                </div>
            </div>
            <div id="main_title">
                <h1>Controle Financeiro Pessoal</h1>
            </div>
            <HeaderUserData />
            <MenuMobileControl />
        </div>
    );
}

export default Header;