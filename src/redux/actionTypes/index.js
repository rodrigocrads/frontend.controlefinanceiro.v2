import * as userTypes from './userTypes';
import * as categoryTypes from './categoryTypes';
import * as entryTypes from './entryTypes';
import * as sidebarTypes from './sidebarTypes';

const actionTypes = {
    ...categoryTypes,
    ...entryTypes,
    ...sidebarTypes,
    ...userTypes,
};

export default actionTypes;