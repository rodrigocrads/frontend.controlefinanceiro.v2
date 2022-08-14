import axios from "axios";
import resolveError from "../helpers/resolveError";

class HttpClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    baseUrl;

    get(url, params) {
        return axios.get(this.buildUrl(url, params), this.getHeaders())
            .catch(e => { resolveError(e) });
    }

    post(url, body, params) {
        return axios.post(this.buildUrl(url, params), body, this.getHeaders())
            .catch(e => { resolveError(e) });
    }

    put(url, body, params) {
        return axios.put(this.buildUrl(url, params), body, this.getHeaders())
            .catch(e => { resolveError(e) });
    }

    patch(url, body, params) {
        return axios.patch(this.buildUrl(url, params), body, this.getHeaders())
            .catch(e => { resolveError(e) });
    }

    delete(url) {
        return axios.delete(this.buildUrl(url), this.getHeaders())
            .catch(e => { resolveError(e) });
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