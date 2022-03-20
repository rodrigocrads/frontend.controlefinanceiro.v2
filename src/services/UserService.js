import BaseApiService from './BaseApiService';

class UserService extends BaseApiService {
    get() {
        return this.httpClient.get(`user`)
            .then(resp => resp.data)
            .catch(err => console.log(err));
    }

    update(data) {
        return this.httpClient.patch(`user`, data)
        .then((response) => {
            if (response.status === 200) {
                alert('Usuário atualizado com sucesso.');
            }
        })
        .catch(err => console.log(err));
    }
}

export default UserService;