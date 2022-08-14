import ValidationError from '../errors/ValidationError';
import {toastr} from 'react-redux-toastr'

export default async function errorHandler(error) {
    if (error instanceof ValidationError) {
        error.errors.forEach(specificMessageItem => toastr.error(error.message, specificMessageItem));
    }
}