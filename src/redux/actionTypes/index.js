import * as categoryTypes from './categoryTypes';
import * as variableRevenueTypes from './variableRevenueTypes';
import * as variableExpenseTypes from './variableExpenseTypes';
import * as financialTransactionTypes from './financialTransactionTypes';

const actionTypes = {
    ...categoryTypes,
    ...variableRevenueTypes,
    ...variableExpenseTypes,
    ...financialTransactionTypes,
};

export default actionTypes;