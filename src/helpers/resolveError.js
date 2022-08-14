import ValidationError from '../errors/ValidationError';

const DEFAULT_MESSAGE = "Erro desconhecido, favor tentar novamente após alguns segundos, caso o erro persista, entre em contato com o suporte.";

export default function resolveError(error) {
    switch (error.response.status) {
        case 422:
            throw new ValidationError(error.response.data);
        default:
            throw new Error(DEFAULT_MESSAGE);
    }
};