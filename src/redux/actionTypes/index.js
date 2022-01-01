import * as categoryTypes from './categoryTypes';
import * as financialTransactionTypes from './financialTransactionTypes';

const actionTypes = {
    ...categoryTypes,
    ...financialTransactionTypes,
};

export default actionTypes;