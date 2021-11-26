import BaseApiService from './BaseApiService';

class VariableRevenueService extends BaseApiService
{
    getById(id) {
        return this.httpClient.get(`variableRevenue/${id}`)
            .then(resp => resp.data)
            .catch(err => console.log(err));
    }

    list() {
        return this.httpClient.get(`variableRevenue`)
            .then(response => response.data)
            .catch(err => console.log(err));
    }

    update(id, data) {
        return this.httpClient.put(`variableRevenue/${id}`, data)
            .then((response) => {
                if (response.status === 200) {
                    alert('Receita variável, atualizada com sucesso.');
                }
            })
            .catch(err => console.log(err));
    }

    create(data) {
        return this.httpClient.post(`variableRevenue`, data)
            .then((response) => {
                if (response.status === 201) {
                    alert('Receita variável, criada com sucesso.');
                }
            })
            .catch(err => console.log(err));
    }

    delete(id) {
        return this.httpClient.delete(`variableRevenue/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    alert('Receita variável, excluida com sucesso.');
                }
            })
            .catch(err => console.log(err));
    }
}

export default VariableRevenueService;