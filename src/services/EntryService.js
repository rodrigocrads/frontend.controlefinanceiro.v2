import BaseApiService from './BaseApiService';

class EntryService extends BaseApiService
{
    getById(id) {
        return this.httpClient.get(`entry/${id}`)
            .then(response => response.data);
    }

    list(params = []) {
        return this.httpClient.get(`entry`, params)
            .then(response => response.data);
    }

    update(id, data) {
        return this.httpClient.put(`entry/${id}`, data);
    }

    create(data) {
        return this.httpClient.post(`entry`, data);
    }

    delete(id) {
        return this.httpClient.delete(`entry/${id}`);
    }
}

export default EntryService;