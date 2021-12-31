import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { categoryReducer } from './reducers/categoryReducer';
import { financialTransactionReducer } from './reducers/financialTransactionReducer';

const rootReducer = combineReducers({
    form: formReducer,
    category: categoryReducer,
    financialTransaction: financialTransactionReducer,
});

export default rootReducer;