import type from '../actionTypes';

const initialState = {
    selected: {},
    all: [],
};

export const entryReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.STORE_SELECTED_ENTRY:
            return {
                ...state,
                selected: { ...action.payload },
            };
        case type.STORE_ALL_ENTRIES:
            return {
                ...state,
                all: action.payload,
            };
        case type.CLEAR_SELECTED_ENTRY:
            return {
                ...state,
                selected: {},
            };
        case type.DELETE_ENTRY:
            return {
                ...state,
                all: state.all.filter((item) => item.id !== action.payload.id)
            }
        default:
            return state;
    }
};