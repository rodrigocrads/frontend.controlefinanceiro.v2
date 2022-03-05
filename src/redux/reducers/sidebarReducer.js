import type from '../actionTypes';

const initialState = {
    isActive: false,
};

export const sidebarReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.TOGGL_SIDEBAR_SHOW:
            return {
                ...state,
                isActive: action.payload,
            };
        default:
            return state;
    }
};