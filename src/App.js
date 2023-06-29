import { BrowserRouter } from 'react-router-dom';

import Sidebar from './components/Sidebar/index.js';
import Header from './components/Header/index.js';
import Footer from './components/Footer/index.js';

import Routes from './Routes.js';
import Message from './components/Message/index.js';

function App() {
	return (
		<BrowserRouter>
			<Message />
			<Header />
			<Sidebar />
			<div className='content-wrapper' style={{'min-height': '250px'}}>
				<section className="content">
					<Routes />
				</section>
			</div>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
