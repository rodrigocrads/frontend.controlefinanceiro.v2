import axios from 'axios';

const headers = {
    'Authorization': `Bearer ${localStorage.getItem('financial_control_access_token')}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

export default class CategoryService
{
    static getById(id) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}category/${id}`, { headers: headers })
            .then(resp => resp.data)
            .catch(err => console.log(err));
    }

    static update(id, data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}category/${id}`, data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    alert('Categoria atualizada com sucesso.');
                }
            })
            .catch(err => console.log(err));
    }

    static create(data) {
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}category`, data, { headers: headers })
            .then((response) => {
                if (response.status === 201) {
                    alert('Categoria criada com sucesso.');
                }
            })
            .catch(err => console.log(err));
    }

    static delete(id) {
        return axios.delete(`${process.env.REACT_APP_API_BASE_URL}category/${id}`, { headers: headers })
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

    static fetchAll() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}category`, { headers: headers })
            .then(response => response.data)
            .catch(err => console.log(err));
    }
}