import CategoryController from '../../controllers/CategoryController';

import {
    GET_CATEGORY_BY_ID,
    STORE_CATEGORY,
} from '../types/categoryTypes';

export const getCategoryById = id => ({
    type: GET_CATEGORY_BY_ID,
    payload: async dispatch => {
        const categoryController = new CategoryController();
        const category = await categoryController.getCategorybyId(id);

        dispatch({ type: STORE_CATEGORY, payload: category });
    }
});