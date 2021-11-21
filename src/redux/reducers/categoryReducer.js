import { 
    STORE_SELECTED_CATEGORY,
    CLEAR_SELECTED_CATEGORY,
    STORE_ALL_CATEGORIES,
} from '../types/categoryTypes';

const initialState = {
    selected: {},
    all: [],
};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_SELECTED_CATEGORY:
            return {
                ...state,
                selected: { ...action.payload },
            };
        case STORE_ALL_CATEGORIES:
            return {
                ...state,
                all: action.payload,
            };
        case CLEAR_SELECTED_CATEGORY:
            return {
                ...state,
                selected: {},
            };
        default:
            return state;
    }
};