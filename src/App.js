import icoMenuEdit from './img/edit.png';

import Sidebar from './components/Sidebar/index.js';
import Header from './components/Header/index.js';
import Footer from './components/Footer/index.js';

function App() {
	return (
		<div>
			<div id="fundo_total"></div>
			<div id="container">

				<Header />
				<Sidebar />

				<div id="principal">
					<div className="header_walk_links">
						DASHBOARD
                	</div>
					<div className="widget">
						<div className="widget_header">
							<img src={icoMenuEdit} className="ico" alt="" />
                       		Economia do mês
                    	</div>
						<div className="widget_content"></div>
					</div>
				</div>

				<Footer />

			</div>
		</div>
	);
}

export default App;
