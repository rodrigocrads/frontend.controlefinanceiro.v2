import { toastr } from 'react-redux-toastr';
import { reset } from 'redux-form';
import EntryController from '../../controllers/EntryController';
import errorHandler from '../../helpers/errorHandler';
import actionTypes from '../actionTypes';

export const getEntryById = id => ({
    type: actionTypes.GET_ENTRY_BY_ID,
    payload: async dispatch => {
        try {
            const entry = await (new EntryController()).getById(id);

            dispatch({ type: actionTypes.STORE_SELECTED_ENTRY, payload: entry });
        } catch (error) {
            await errorHandler(error);
        }
    }
});

export const updateEntry = (id, entry) => ({
    type: actionTypes.UPDATE_ENTRY,
    payload: async dispatch => {
        try {
            await (new EntryController()).update(id, entry);
    
            await dispatch({ type: actionTypes.STORE_SELECTED_ENTRY, payload: entry });

            toastr.success("Sucesso", "Lançamento atualizada com sucesso.");
        } catch(error) {
            await errorHandler(error);
        }
    }
});

export const createEntry = (entry) => ({
    type: actionTypes.CREATE_ENTRY,
    payload: async (dispatch) => {
        try {
            await (new EntryController()).create(entry);

            await dispatch(reset('entryForm'));

            toastr.success("Sucesso", "Lançamento criada com sucesso.");
        } catch(error) {
            await errorHandler(error);
        }
    }
});

export const deleteEntry = (id) => ({
    type: actionTypes.DELETE_ENTRY,
    payload: async dispatch => {
        try {
            await (new EntryController()).delete(id);

            await dispatch({ type: actionTypes.DELETE_ENTRY, payload: { id } });

            toastr.success("Sucesso", "Lançamento excluída com sucesso.");
        } catch (error) {
            await errorHandler(error);
        }
    }
});

export const fetchEntries = (params = []) => ({
    type: actionTypes.FETCH_ENTRIES,
    payload: async dispatch => {
        try {
            const entries = await (new EntryController()).list(params);

            await dispatch({ type: actionTypes.STORE_ALL_ENTRIES, payload: entries });
        } catch (error) {
            await errorHandler(error);
        }
    }
});

export const clearSelectedEntry = () => ({ type: actionTypes.CLEAR_SELECTED_ENTRY });