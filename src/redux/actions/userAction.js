import UserController from '../../controllers/UserController';
import type from '../actionTypes';

export const getUser = () => ({
    type: type.GET_USER_DATA,
    payload: async dispatch => {
        const userController = new UserController();
        const user = await userController.get();

        dispatch({ type: type.STORE_CURRENT_USER_DATA, payload: user });
    }
});

export const updateUser = data => ({
    type: type.UPDATE_USER_DATA,
    payload: async dispatch => {
        const userController = new UserController();
        const user = await userController.update(data);

        dispatch({ type: type.STORE_CURRENT_USER_DATA, payload: user });
    }
});