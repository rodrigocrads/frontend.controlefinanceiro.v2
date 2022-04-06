import types from '../actionTypes';
import UserController from '../../controllers/UserController';
import errorHandler from '../../helpers/errorHandler';
import formTypes from '../formTypes';

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
        await userController.update(data);

        dispatch({ type: types.STORE_CURRENT_USER_DATA, payload: data });
    }
});

export const changePassword = data => ({
    type: types.CHANGE_PASSWORD,
    payload: async (dispatch) => {
        const userController = new UserController();
        try {
            await userController.changePassword(data);

        } catch(error) {
            await errorHandler(error, dispatch, formTypes.CHANGE_PASSWORD_FORM);
        }
    }
});
