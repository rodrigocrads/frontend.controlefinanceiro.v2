import types from '../actionTypes';
import UserController from '../../controllers/UserController';
import errorHandler from '../../helpers/errorHandler';
import { toastr } from 'react-redux-toastr';

export const getUser = () => ({
    type: types.GET_USER_DATA,
    payload: async dispatch => {
        const userController = new UserController();
        const user = await userController.get();

        dispatch({ type: types.STORE_CURRENT_USER_DATA, payload: user });
    }
});

export const updateUser = data => ({
    type: types.UPDATE_USER_DATA,
    payload: async dispatch => {
        const userController = new UserController();
        try {
            await userController.update(data);

            dispatch({ type: types.STORE_CURRENT_USER_DATA, payload: data });

            toastr.success("Sucesso", "Usuário atualizado com sucesso.");
        } catch(error) {
            await errorHandler(error);
        }
    }
});

export const changePassword = data => ({
    type: types.CHANGE_PASSWORD,
    payload: async () => {
        const userController = new UserController();
        try {
            await userController.changePassword(data);

            toastr.success("Sucesso", "Senha alterada com sucesso.");
        } catch(error) {
            errorHandler(error);
        }
    }
});
