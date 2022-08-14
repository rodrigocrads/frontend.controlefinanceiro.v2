import * as userTypes from './userTypes';
import * as categoryTypes from './categoryTypes';
import * as financialTransactionTypes from './financialTransactionTypes';
import * as sidebarTypes from './sidebarTypes';

const actionTypes = {
    ...categoryTypes,
    ...financialTransactionTypes,
    ...sidebarTypes,
    ...userTypes,
};

export default actionTypes;