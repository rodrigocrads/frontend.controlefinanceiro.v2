import BaseApiService from './BaseApiService';

class VariableExpenseService extends BaseApiService
{
    getById(id) {
        return this.httpClient.get(`variableExpense/${id}`)
            .then(resp => resp.data)
            .catch(err => console.log(err));
    }

    list(params = []) {
        return this.httpClient.get(`variableExpense`, params)
            .then(response => response.data)
            .catch(err => console.log(err));
    }

    update(id, data) {
        return this.httpClient.put(`variableExpense/${id}`, data)
            .then((response) => {
                if (response.status === 200) {
                    alert('Despesa variável atualizada com sucesso.');
                }
            })
            .catch(err => console.log(err));
    }

    create(data) {
        return this.httpClient.post(`variableExpense`, data)
            .then((response) => {
                if (response.status === 201) {
                    alert('Despesa variável criada com sucesso.');
                }
            })
            .catch(err => console.log(err));
    }

    delete(id) {
        return this.httpClient.delete(`variableExpense/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    alert('Despesa variável excluida com sucesso.');
                }
            })
            .catch(err => console.log(err));
    }
}

export default VariableExpenseService;