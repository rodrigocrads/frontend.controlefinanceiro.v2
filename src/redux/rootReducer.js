import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { categoryReducer } from './reducers/categoryReducer';
import { financialTransactionReducer } from './reducers/financialTransactionReducer';
import { sidebarReducer } from './reducers/sidebarReducer';
import { userReducer } from './reducers/userReducer';

const rootReducer = combineReducers({
    form: formReducer,
    category: categoryReducer,
    financialTransaction: financialTransactionReducer,
    sidebar: sidebarReducer,
    user: userReducer,
    toastr: toastrReducer,
});

export default rootReducer;