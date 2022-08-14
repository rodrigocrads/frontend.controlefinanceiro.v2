import BaseApiService from './BaseApiService';

class CategoryService extends BaseApiService {
    getById(id) {
        return this.httpClient.get(`category/${id}`)
            .then(resp => resp.data);
    }

    list() {
        return this.httpClient.get(`category`)
            .then(response => response.data);
    }

    listByType(type) {
        return this.httpClient.get(`category?type=${type}`)
            .then(response => response.data);
    }

    update(id, data) {
        return this.httpClient.put(`category/${id}`, data);
    }

    create(data) {
        return this.httpClient.post(`category`, data);
    }

    delete(id) {
        return this.httpClient.delete(`category/${id}`);
    }
}

export default CategoryService;