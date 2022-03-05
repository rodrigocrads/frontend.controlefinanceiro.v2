import * as categoryTypes from './categoryTypes';
import * as financialTransactionTypes from './financialTransactionTypes';
import * as sidebarTypes from './sidebarTypes';

const actionTypes = {
    ...categoryTypes,
    ...financialTransactionTypes,
    ...sidebarTypes,
};

export default actionTypes;