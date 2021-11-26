import type from '../actionTypes';

const initialState = {
    selected: {},
    all: [],
};

export const variableRevenueReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.STORE_SELECTED_VARIABLE_REVENUE:
            return {
                ...state,
                selected: { ...action.payload },
            };
        case type.STORE_ALL_CATEGORIES:
            return {
                ...state,
                all: action.payload,
            };
        case type.CLEAR_SELECTED_VARIABLE_REVENUE:
            return {
                ...state,
                selected: {},
            };
        default:
            return state;
    }
};