import type from '../actionTypes';

const initialState = {
    current: {}
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.STORE_CURRENT_USER_DATA:
            return {
                ...state,
                current: { ...action.payload },
            };
        default:
            return state;
    }
};