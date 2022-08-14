import { reset } from 'redux-form';
import CategoryController from '../../controllers/CategoryController';
import errorHandler from '../../helpers/errorHandler';
import actionTypes from '../actionTypes';

export const getCategoryById = id => ({
    type: actionTypes.GET_CATEGORY_BY_ID,
    payload: async dispatch => {
        try {
            const category = await (new CategoryController()).getById(id);

            dispatch({ type: actionTypes.STORE_SELECTED_CATEGORY, payload: category });
        } catch (error) {
            await errorHandler(error);
        }
    }
});

export const updateCategory = (id, category) => ({
    type: actionTypes.UPDATE_CATEGORY,
    payload: async dispatch => {
        try {
            await (new CategoryController()).update(id, category);

            dispatch({ type: actionTypes.STORE_SELECTED_CATEGORY, payload: category });
        } catch (error) {
            await errorHandler(error);
        }
    }
});

export const createCategory = (category) => ({
    type: actionTypes.CREATE_CATEGORY,
    payload: async (dispatch) => {
        try {
            await (new CategoryController()).create(category);

            await dispatch(reset('categoryForm'));
        } catch (error) {
            await errorHandler(error);
        }
    }
});

export const deleteCategory = (id) => ({
    type: actionTypes.DELETE_CATEGORY,
    payload: async dispatch => {
        try {
            await (new CategoryController()).delete(id);

            dispatch(fetchCategories());
        } catch (error) {
            await errorHandler(error);
        }
    }
});

export const fetchCategories = () => ({
    type: actionTypes.FETCH_CATEGORIES,
    payload: async dispatch => {
        try {
            const categories = await (new CategoryController()).list();

            await dispatch({ type: actionTypes.STORE_ALL_CATEGORIES, payload: categories });
        } catch (error) {
            await errorHandler(error);
        }
    }
});

export const fetchCategoriesByType = (categoryType) => ({
    type: actionTypes.FETCH_CATEGORIES_BY_TYPE,
    payload: async dispatch => {
        try {
            const categories = await (new CategoryController()).listByType(categoryType);

            await dispatch({ type: actionTypes.STORE_ALL_CATEGORIES, payload: categories });
        } catch (error) {
            await errorHandler(error);
        }
    }
});

export const clearSelectedCategory = () => ({ type: actionTypes.CLEAR_SELECTED_CATEGORY });