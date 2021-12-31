import { reset } from 'redux-form';
import CategoryController from '../../controllers/CategoryController';
import type from '../actionTypes';

export const getCategoryById = id => ({
    type: type.GET_CATEGORY_BY_ID,
    payload: async dispatch => {
        const categoryController = new CategoryController();
        const category = await categoryController.getById(id);

        dispatch({ type: type.STORE_SELECTED_CATEGORY, payload: category });
    }
});

export const updateCategory = (id, category) => ({
    type: type.UPDATE_CATEGORY,
    payload: async dispatch => {
        const categoryController = new CategoryController();
        await categoryController.update(id, category);

        dispatch({ type: type.STORE_SELECTED_CATEGORY, payload: category });
    }
});

export const createCategory = (category) => ({
    type: type.CREATE_CATEGORY,
    payload: async (dispatch) => {
        const categoryController = new CategoryController();
        await categoryController.create(category);

        await dispatch(reset('categoryForm'));
    }
});

export const deleteCategory = (id) => ({
    type: type.DELETE_CATEGORY,
    payload: async dispatch => {
        const categoryController = new CategoryController();
        await categoryController.delete(id);

        dispatch(fetchCategories());
    }
});

export const fetchCategories = () => ({
    type: type.FETCH_CATEGORIES,
    payload: async dispatch => {
        const categoryController = new CategoryController();
        const categories = await categoryController.list();

        await dispatch({ type: type.STORE_ALL_CATEGORIES, payload: categories });
    }
});

export const fetchCategoriesByType = (categoryType) => ({
    type: type.FETCH_CATEGORIES_BY_TYPE,
    payload: async dispatch => {
        const categoryController = new CategoryController();
        const categories = await categoryController.listByType(categoryType);

        await dispatch({ type: type.STORE_ALL_CATEGORIES, payload: categories });
    }
});

export const clearSelectedCategory = () => ({ type: type.CLEAR_SELECTED_CATEGORY });