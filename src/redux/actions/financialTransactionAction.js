import { reset } from 'redux-form';
import FinancialTransactionController from '../../controllers/FinancialTransactionController';
import type from '../actionTypes';

export const getFinancialTransactionById = id => ({
    type: type.GET_FINANCIAL_TRANSACTION_BY_ID,
    payload: async dispatch => {
        const financialTransactionController = new FinancialTransactionController();
        const financialTransaction = await financialTransactionController.getById(id);

        dispatch({ type: type.STORE_SELECTED_FINANCIAL_TRANSACTION, payload: financialTransaction });
    }
});

export const updateFinancialTransaction = (id, financialTransaction) => ({
    type: type.UPDATE_FINANCIAL_TRANSACTION,
    payload: async dispatch => {
        const financialTransactionController = new FinancialTransactionController();
        await financialTransactionController.update(id, financialTransaction);

        await dispatch({ type: type.STORE_SELECTED_FINANCIAL_TRANSACTION, payload: financialTransaction });
    }
});

export const createFinancialTransaction = (financialTransaction) => ({
    type: type.CREATE_FINANCIAL_TRANSACTION,
    payload: async (dispatch) => {
        const financialTransactionController = new FinancialTransactionController();
        await financialTransactionController.create(financialTransaction);

        await dispatch(reset('financialTransactionForm'));
    }
});

export const deleteFinancialTransaction = (id) => ({
    type: type.DELETE_FINANCIAL_TRANSACTION,
    payload: async dispatch => {
        try {
            const financialTransactionController = new FinancialTransactionController();
            await financialTransactionController.delete(id);

            await dispatch({ type: type.DELETE_FINANCIAL_TRANSACTION, payload: { id } });
        } catch (e) {
            console.log('Erro ao tentar excluir um registro')
        }
    }
});

export const fetchFinancialTransactions = (params = []) => ({
    type: type.FETCH_FINANCIAL_TRANSACTIONS,
    payload: async dispatch => {
        const financialTransactionController = new FinancialTransactionController();
        const financialTransactions = await financialTransactionController.list(params);

        await dispatch({ type: type.STORE_ALL_FINANCIAL_TRANSACTIONS, payload: financialTransactions });
    }
});

export const clearSelectedFinancialTransaction = () => ({ type: type.CLEAR_SELECTED_FINANCIAL_TRANSACTION });