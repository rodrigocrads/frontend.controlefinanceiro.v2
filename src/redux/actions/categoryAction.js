import CategoryController from '../../controllers/CategoryController';

import {
    GET_CATEGORY_BY_ID,
    STORE_SELECTED_CATEGORY,
    UPDATE_CATEGORY,
    CREATE_CATEGORY,
    CLEAR_SELECTED_CATEGORY,
    DELETE_CATEGORY,
    FETCH_CATEGORIES,
    STORE_ALL_CATEGORIES,
} from '../types/categoryTypes';

export const getCategoryById = id => ({
    type: GET_CATEGORY_BY_ID,
    payload: async dispatch => {
        const categoryController = new CategoryController();
        const category = await categoryController.getById(id);

        dispatch({ type: STORE_SELECTED_CATEGORY, payload: category });
    }
});

export const updateCategory = (id, category) => {
    return {
        type: UPDATE_CATEGORY,
        payload: async dispatch => {
            const categoryController = new CategoryController();
            await categoryController.update(id, category);

            dispatch({ type: STORE_SELECTED_CATEGORY, payload: category });
        }
    }
};

export const createCategory = (category) => {
    return {
        type: CREATE_CATEGORY,
        payload: async () => {
            const categoryController = new CategoryController();
            await categoryController.create(category);
        }
    }
};

export const deleteCategory = (id) => {
    return {
        type: DELETE_CATEGORY,
        payload: async dispatch => {
            const categoryController = new CategoryController();
            await categoryController.delete(id);

            dispatch(fetchCategories());
        }
    }
}

export const fetchCategories = () => ({
    type: FETCH_CATEGORIES,
    payload: async dispatch => {
        const categoryController = new CategoryController();
        const categories = await categoryController.fetchAll();

        dispatch({ type: STORE_ALL_CATEGORIES, payload: categories });
    }
});

export const clearSelectedCategory = () => ({ type: CLEAR_SELECTED_CATEGORY });