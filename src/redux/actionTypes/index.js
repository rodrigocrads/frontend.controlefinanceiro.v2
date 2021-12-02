import * as categoryTypes from './categoryTypes';
import * as variableRevenueTypes from './variableRevenueTypes';
import * as variableExpenseTypes from './variableExpenseTypes';

const actionTypes = {
    ...categoryTypes,
    ...variableRevenueTypes,
    ...variableExpenseTypes,
};

export default actionTypes;