import BaseApiService from './BaseApiService';

class UserService extends BaseApiService {
    get() {
        return this.httpClient.get('user')
            .then(resp => resp.data);
    }

    update(data) {
        return this.httpClient.patch('user', data);
    }

    changePassword(data) {
        return this.httpClient.patch('changePassword', data);
    }
}

export default UserService;