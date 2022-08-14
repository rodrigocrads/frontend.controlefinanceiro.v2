import { BrowserRouter } from 'react-router-dom';

import Sidebar from './components/Sidebar/index.js';
import Header from './components/Header/index.js';
import Footer from './components/Footer/index.js';

import Routes from './Routes.js';
import Message from './components/Message/index.js';

function App() {
	return (
		<BrowserRouter>
			<div id="container">
				<Message />
				<Header />
				<Sidebar />
				<div id="principal">
					<Routes />
				</div>

				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
