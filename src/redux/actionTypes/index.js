import * as userTypes from './userTypes';
import * as categoryTypes from './categoryTypes';
import * as financialTransactionTypes from './financialTransactionTypes';
import * as sidebarTypes from './sidebarTypes';
import * as globalTypes from './globalTypes';

const actionTypes = {
    ...categoryTypes,
    ...financialTransactionTypes,
    ...sidebarTypes,
    ...userTypes,
    ...globalTypes,
};

export default actionTypes;