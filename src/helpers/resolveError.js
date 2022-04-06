import ValidationError from '../exceptions/ValidationError';

export default function resolveError(error) {
    switch (error.response.status) {
        case 422:
            throw new ValidationError(error.response.data);
        default:
            throw new Error("Erro desconhecido. Favor contate o suporte.");
    }
};