import type from '../actionTypes';

const initialState = {
    selected: {},
    all: [],
};

export const variableExpenseReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.STORE_SELECTED_VARIABLE_EXPENSE:
            return {
                ...state,
                selected: { ...action.payload },
            };
        case type.STORE_ALL_VARIABLES_EXPENSES:
            return {
                ...state,
                all: action.payload,
            };
        case type.CLEAR_SELECTED_VARIABLE_EXPENSE:
            return {
                ...state,
                selected: {},
            };
        default:
            return state;
    }
};