import type from '../actionTypes';

const initialState = {
    selected: {},
    all: [],
    revenueType: [],
    expenseType: [],
};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.STORE_SELECTED_CATEGORY:
            return {
                ...state,
                selected: { ...action.payload },
            };
        case type.STORE_ALL_CATEGORIES:
            return {
                ...state,
                all: action.payload,
            };
        case type.STORE_REVENUE_TYPE_CATEGORIES:
            return {
                ...state,
                revenueType: action.payload,
            };
        case type.STORE_EXPENSE_TYPE_CATEGORIES:
            return {
                ...state,
                expenseType: action.payload,
            };
        case type.CLEAR_SELECTED_CATEGORY:
            return {
                ...state,
                selected: {},
            };
        default:
            return state;
    }
};