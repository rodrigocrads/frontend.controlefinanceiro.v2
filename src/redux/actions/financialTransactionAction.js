import { toastr } from 'react-redux-toastr';
import { reset } from 'redux-form';
import FinancialTransactionController from '../../controllers/FinancialTransactionController';
import errorHandler from '../../helpers/errorHandler';
import actionTypes from '../actionTypes';

export const getFinancialTransactionById = id => ({
    type: actionTypes.GET_FINANCIAL_TRANSACTION_BY_ID,
    payload: async dispatch => {
        try {
            const financialTransaction = await (new FinancialTransactionController()).getById(id);

            dispatch({ type: actionTypes.STORE_SELECTED_FINANCIAL_TRANSACTION, payload: financialTransaction });
        } catch (error) {
            await errorHandler(error);
        }
    }
});

export const updateFinancialTransaction = (id, financialTransaction) => ({
    type: actionTypes.UPDATE_FINANCIAL_TRANSACTION,
    payload: async dispatch => {
        try {
            await (new FinancialTransactionController()).update(id, financialTransaction);
    
            await dispatch({ type: actionTypes.STORE_SELECTED_FINANCIAL_TRANSACTION, payload: financialTransaction });

            toastr.success("Sucesso", "Transação financeira atualizada com sucesso.");
        } catch(error) {
            await errorHandler(error);
        }
    }
});

export const createFinancialTransaction = (financialTransaction) => ({
    type: actionTypes.CREATE_FINANCIAL_TRANSACTION,
    payload: async (dispatch) => {
        try {
            await (new FinancialTransactionController()).create(financialTransaction);

            await dispatch(reset('financialTransactionForm'));

            toastr.success("Sucesso", "Transação financeira criada com sucesso.");
        } catch(error) {
            await errorHandler(error);
        }
    }
});

export const deleteFinancialTransaction = (id) => ({
    type: actionTypes.DELETE_FINANCIAL_TRANSACTION,
    payload: async dispatch => {
        try {
            await (new FinancialTransactionController()).delete(id);

            await dispatch({ type: actionTypes.DELETE_FINANCIAL_TRANSACTION, payload: { id } });

            toastr.success("Sucesso", "Transação financeira excluída com sucesso.");
        } catch (error) {
            await errorHandler(error);
        }
    }
});

export const fetchFinancialTransactions = (params = []) => ({
    type: actionTypes.FETCH_FINANCIAL_TRANSACTIONS,
    payload: async dispatch => {
        try {
            const financialTransactions = await (new FinancialTransactionController()).list(params);

            await dispatch({ type: actionTypes.STORE_ALL_FINANCIAL_TRANSACTIONS, payload: financialTransactions });
        } catch (error) {
            await errorHandler(error);
        }
    }
});

export const clearSelectedFinancialTransaction = () => ({ type: actionTypes.CLEAR_SELECTED_FINANCIAL_TRANSACTION });