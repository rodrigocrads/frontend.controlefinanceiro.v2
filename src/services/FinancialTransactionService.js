import BaseApiService from './BaseApiService';

class FinancialTransactionService extends BaseApiService
{
    getById(id) {
        return this.httpClient.get(`financialTransaction/${id}`)
            .then(response => response.data);
    }

    list(params = []) {
        return this.httpClient.get(`financialTransaction`, params)
            .then(response => response.data);
    }

    update(id, data) {
        return this.httpClient.put(`financialTransaction/${id}`, data);
    }

    create(data) {
        return this.httpClient.post(`financialTransaction`, data);
    }

    delete(id) {
        return this.httpClient.delete(`financialTransaction/${id}`);
    }
}

export default FinancialTransactionService;