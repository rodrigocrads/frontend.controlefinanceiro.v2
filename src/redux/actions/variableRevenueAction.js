import VariableRevenueController from '../../controllers/VariableRevenueController';
import type from '../actionTypes';

export const getVariableRevenueById = id => ({
    type: type.GET_VARIABLE_REVENUE_BY_ID,
    payload: async dispatch => {
        const variableRevenueController = new VariableRevenueController();
        const variableRevenue = await variableRevenueController.getById(id);

        dispatch({ type: type.STORE_SELECTED_VARIABLE_REVENUE, payload: variableRevenue });
    }
});

export const updateVariableRevenue = (id, variableRevenue) => ({
    type: type.UPDATE_VARIABLE_REVENUE,
    payload: async dispatch => {
        const variableRevenueController = new VariableRevenueController();
        await variableRevenueController.update(id, variableRevenue);

        dispatch({ type: type.STORE_SELECTED_VARIABLE_REVENUE, payload: variableRevenue });
    }
});

export const createVariableRevenue = (variableRevenue) => ({
    type: type.CREATE_VARIABLE_REVENUE,
    payload: async () => {
        const variableRevenueController = new VariableRevenueController();
        await variableRevenueController.create(variableRevenue);
    }
});

export const deleteVariableRevenue = (id) => ({
    type: type.DELETE_VARIABLE_REVENUE,
    payload: async dispatch => {
        const variableRevenueController = new VariableRevenueController();
        await variableRevenueController.delete(id);

        dispatch(fetchCategories());
    }
});

export const fetchCategories = () => ({
    type: type.FETCH_VARIABLES_REVENUES,
    payload: async dispatch => {
        const variableRevenueController = new VariableRevenueController();
        const variablesRevenues = await variableRevenueController.list();

        dispatch({ type: type.STORE_ALL_VARIABLES_REVENUES, payload: variablesRevenues });
    }
});

export const clearSelectedVariableRevenue = () => ({ type: type.CLEAR_SELECTED_VARIABLE_REVENUE });