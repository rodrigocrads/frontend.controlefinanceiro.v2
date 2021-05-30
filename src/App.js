import icoMenuEdit from './img/edit.png';

import icoMail from './img/mail.png';
import icoUsers from './img/users.png';
import icoUser from './img/user.png';

import icoWrenchChart from './img/wrench.png';

import Menu from './components/Menu/index.js';
import Top from './components/Top/index.js';
import Bottom from './components/Bottom/index.js';

function App() {
	return (
		<div>
			<div id="fundo_total"></div>
			<div id="container">
				<Top />
				<Menu />

				<div id="principal">
					<div className="header_walk_links">
						HOME
                	</div>
					<div className="widget">
						<div className="widget_header">
							<img src={icoMenuEdit} className="ico" alt="" />
                       		Header Widget
                    	</div>
						<div className="widget_content"></div>
					</div>
				</div>

				<Bottom />
			</div>
		</div>
	);
}

export default App;
