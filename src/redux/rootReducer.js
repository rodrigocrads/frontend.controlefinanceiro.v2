import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { categoryReducer } from './reducers/categoryReducer';

const rootReducer = combineReducers({
    form: formReducer,
    category: categoryReducer,
});

export default rootReducer;