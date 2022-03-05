// import { Link } from 'react-router-dom';
// import logo from '../../img/logo.png';
import MenuMobileControl from '../MenuMobileControl';

function Header() {
    return (
        <div id="topo">
            <div id="logo_area">
                <div className="logo">
                    {/* <Link to="/"><img src={logo} alt="LOGO" /></Link> */}
                </div>
            </div>
            <div id="main_title">
                <h1>Controle Financeiro</h1>
            </div>
            <MenuMobileControl />
        </div>
    );
}

export default Header;