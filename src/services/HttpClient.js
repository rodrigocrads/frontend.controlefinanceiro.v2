import axios from "axios";

class HttpClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    baseUrl;

    get(url, params) {
        return axios.get(this.buildUrl(url, params), this.getHeaders());
    }

    post(url, body, params) {
        return axios.post(this.buildUrl(url, params), body, this.getHeaders());
    }

    put(url, body, params) {
        return axios.put(this.buildUrl(url, params), body, this.getHeaders());
    }

    delete(url) {
        return axios.delete(this.buildUrl(url), this.getHeaders());
    }

    buildUrl(url, params = []) {
        if (params.length > 0) {
            return `${this.baseUrl}${url}?${this.buildQueryStringParams(params)}`;
        }

        return `${this.baseUrl}${url}`;
    }

    getHeaders() {
        return {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('financial_control_access_token')}`,
            }
        };
    }

    buildQueryStringParams(params) {
        let queryString = '';
        for(var i = 0; i < params.length; i++) {
            if (i === 0) {
                queryString += params[i];
                continue;
            }

            queryString += `&${params[i]}`;
        }

        return queryString;
    }
}

export default HttpClient;