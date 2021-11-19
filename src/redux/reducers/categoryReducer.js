import { 
    STORE_CATEGORY,
} from '../types/categoryTypes';

const initialState = {};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_CATEGORY:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};