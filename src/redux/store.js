import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk-fsa';
import rootReducer from './rootReducer';

const composedEnhancer = composeWithDevTools(
    applyMiddleware(thunk),
);

const store = createStore(
    rootReducer,
    composedEnhancer,
);

export default store;