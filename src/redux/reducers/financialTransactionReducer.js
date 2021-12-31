import type from '../actionTypes';

const initialState = {
    selected: {},
    all: [],
};

export const financialTransactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.STORE_SELECTED_FINANCIAL_TRANSACTION:
            return {
                ...state,
                selected: { ...action.payload },
            };
        case type.STORE_ALL_FINANCIAL_TRANSACTIONS:
            return {
                ...state,
                all: action.payload,
            };
        case type.CLEAR_SELECTED_FINANCIAL_TRANSACTION:
            return {
                ...state,
                selected: {},
            };
        case type.DELETE_FINANCIAL_TRANSACTION:
            return {
                ...state,
                all: state.all.filter((item) => item.id !== action.payload.id)
            }
        default:
            return state;
    }
};