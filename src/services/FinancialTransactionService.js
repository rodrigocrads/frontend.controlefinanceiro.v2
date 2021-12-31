import BaseApiService from './BaseApiService';

class FinancialTransactionService extends BaseApiService
{
    getById(id) {
        return this.httpClient.get(`financialTransaction/${id}`)
            .then(resp => resp.data)
            .catch(err => console.log(err));
    }

    list(params = []) {
        return this.httpClient.get(`financialTransaction`, params)
            .then(response => response.data)
            .catch(err => console.log(err));
    }

    update(id, data) {
        return this.httpClient.put(`financialTransaction/${id}`, data)
            .then((response) => {
                if (response.status === 200) {
                    alert('Registro atualizado com sucesso.');
                }
            })
            .catch(err => console.log(err));
    }

    create(data) {
        return this.httpClient.post(`financialTransaction`, data)
            .then((response) => {
                if (response.status === 201) {
                    alert('Registro criado com sucesso.');
                }
            })
            .catch(err => console.log(err));
    }

    delete(id) {
        return this.httpClient.delete(`financialTransaction/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    alert('Registro excluído com sucesso.');
                }
            })
            .catch(err => console.log(err));
    }
}

export default FinancialTransactionService;