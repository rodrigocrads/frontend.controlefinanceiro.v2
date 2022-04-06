import { updateSyncErrors } from 'redux-form';
import ValidationError from '../exceptions/ValidationError';

export default async function errorHandler(error, dispatch, form) {
    if (error instanceof ValidationError) {
        await dispatch(updateSyncErrors(form, error.errors));
    }
}