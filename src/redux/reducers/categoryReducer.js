import actionTypes from '../actionTypes';

const initialState = {
    selected: {},
    all: [],
};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_SELECTED_CATEGORY:
            return {
                ...state,
                selected: { ...action.payload },
            };
        case actionTypes.STORE_ALL_CATEGORIES:
            return {
                ...state,
                all: action.payload,
            };
        case actionTypes.CLEAR_SELECTED_CATEGORY:
            return {
                ...state,
                selected: {},
            };
        default:
            return state;
    }
};