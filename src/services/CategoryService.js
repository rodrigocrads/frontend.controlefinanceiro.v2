import BaseApiService from './BaseApiService';

class CategoryService extends BaseApiService {
    getById(id) {
        return this.httpClient.get(`category/${id}`)
            .then(resp => resp.data)
            .catch(err => console.log(err));
    }

    list() {
        return this.httpClient.get(`category`)
            .then(response => response.data)
            .catch(err => console.log(err));
    }

    listByType(type) {
        return this.httpClient.get(`category?type=${type}`)
            .then(response => response.data)
            .catch(err => console.log(err));
    }

    update(id, data) {
        return this.httpClient.put(`category/${id}`, data)
            .then((response) => {
                if (response.status === 200) {
                    alert('Categoria atualizada com sucesso.');
                }
            })
            .catch(err => console.log(err));
    }

    create(data) {
        return this.httpClient.post(`category`, data)
            .then((response) => {
                if (response.status === 201) {
                    alert('Categoria criada com sucesso.');
                }
            })
            .catch(err => console.log(err));
    }

    delete(id) {
        return this.httpClient.delete(`category/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    alert('Categoria excluida com sucesso.');
                }
            })
            .catch(error => {
                // @todo: criar lógica para recuperar os atributos de erro de forma dinâmica
                if (error.response.status === 422) {
                    const idError = error.response.data.id; 
                    alert("Erros de validação: " + idError[0]);
                }
            });
    }
}

export default CategoryService;