import { actionsTypes as type } from '../types';

const initialState = {
    selected: {},
    all: [],
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
        case type.CLEAR_SELECTED_CATEGORY:
            return {
                ...state,
                selected: {},
            };
        default:
            return state;
    }
};