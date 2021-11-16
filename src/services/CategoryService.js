import axios from 'axios';

export default class CategoryService
{
    static async getCategoryById(id) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('financial_control_access_token')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
        return await axios.get(`${process.env.REACT_APP_API_BASE_URL}category/${id}`, { headers: headers })
            .then(resp => {
                return resp.data;
            })
            .catch(err => console.log(err));
    }
}