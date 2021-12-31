import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { categoryReducer } from './reducers/categoryReducer';
import { variableRevenueReducer } from './reducers/variableRevenueReducer';
import { variableExpenseReducer } from './reducers/variableExpenseReducer';
import { financialTransactionReducer } from './reducers/financialTransactionReducer';

const rootReducer = combineReducers({
    form: formReducer,
    category: categoryReducer,
    variableRevenue: variableRevenueReducer,
    variableExpense: variableExpenseReducer,
    financialTransaction: financialTransactionReducer,
});

export default rootReducer;