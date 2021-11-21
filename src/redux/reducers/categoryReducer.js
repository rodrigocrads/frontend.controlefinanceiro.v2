import { 
    STORE_CATEGORY,
    CLEAR_CATEGORY,
} from '../types/categoryTypes';

const initialState = {};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_CATEGORY:
            return {
                ...state,
                ...action.payload,
            };
        case CLEAR_CATEGORY:
            return { ...initialState };
        default:
            return state;
    }
};