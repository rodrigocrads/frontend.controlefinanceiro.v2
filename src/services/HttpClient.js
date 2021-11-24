import axios from "axios";

class HttpClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    baseUrl;

    get(url) {
        return axios.get(this.buildUrl(url), this.getHeaders());
    }

    post(url, body) {
        return axios.post(this.buildUrl(url), body, this.getHeaders());
    }

    put(url, body) {
        return axios.put(this.buildUrl(url), body, this.getHeaders());
    }

    delete(url) {
        return axios.delete(this.buildUrl(url), this.getHeaders());
    }

    buildUrl(url) {
        return `${this.baseUrl}${url}`;
    }

    getHeaders() {
        return {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('financial_control_access_token')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };
    }
}

export default HttpClient;