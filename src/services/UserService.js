import BaseApiService from './BaseApiService';
import resolveError from '../helpers/resolveError';

class UserService extends BaseApiService {
    get() {
        return this.httpClient.get(`user`)
            .then(resp => resp.data)
            .catch(error => { resolveError(error) });
    }

    update(data) {
        return this.httpClient.patch(`user`, data)
            .then((response) => {
                if (response.status === 200) {
                    alert('Usuário atualizado com sucesso.');
                }
            })
            .catch(error => { resolveError(error) });
    }

    changePassword(data) {
        return this.httpClient.patch(`changePassword`, data)
            .then((response) => {
                if (response.status === 200) {
                    alert('Senha atualizada com sucesso.');
                }
            })
            .catch(error => { resolveError(error) });
    }
}

export default UserService;