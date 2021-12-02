import { reset } from 'redux-form';
import VariableExpenseController from '../../controllers/VariableExpenseController';
import type from '../actionTypes';

export const getVariableExpenseById = id => ({
    type: type.GET_VARIABLE_EXPENSE_BY_ID,
    payload: async dispatch => {
        const variableExpenseController = new VariableExpenseController();
        const variableExpense = await variableExpenseController.getById(id);

        dispatch({ type: type.STORE_SELECTED_VARIABLE_EXPENSE, payload: variableExpense });
    }
});

export const updateVariableExpense = (id, variableExpense) => ({
    type: type.UPDATE_VARIABLE_EXPENSE,
    payload: async dispatch => {
        const variableExpenseController = new VariableExpenseController();
        await variableExpenseController.update(id, variableExpense);

        await dispatch({ type: type.STORE_SELECTED_VARIABLE_EXPENSE, payload: variableExpense });
    }
});

export const createVariableExpense = (variableExpense) => ({
    type: type.CREATE_VARIABLE_EXPENSE,
    payload: async (dispatch) => {
        const variableExpenseController = new VariableExpenseController();
        await variableExpenseController.create(variableExpense);

        await dispatch(reset('variableExpenseForm'));
    }
});

export const deleteVariableExpense = (id) => ({
    type: type.DELETE_VARIABLE_EXPENSE,
    payload: async dispatch => {
        const variableExpenseController = new VariableExpenseController();
        await variableExpenseController.delete(id);

        dispatch(fetchVariablesExpenses());
    }
});

export const fetchVariablesExpenses = (params = []) => ({
    type: type.FETCH_VARIABLES_EXPENSES,
    payload: async dispatch => {
        const variableExpenseController = new VariableExpenseController();
        const variablesExpenses = await variableExpenseController.list(params);

        await dispatch({ type: type.STORE_ALL_VARIABLES_EXPENSES, payload: variablesExpenses });
    }
});

export const clearSelectedVariableExpense = () => ({ type: type.CLEAR_SELECTED_VARIABLE_EXPENSE });