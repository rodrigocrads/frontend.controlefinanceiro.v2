import { fetchWithAuth } from "../helpers/utils";

class AuthService
{
    accessToken = null;
    accessTokenKey = 'financial_control_access_token';

    constructor() {
        this.accessToken = localStorage.getItem(this.accessTokenKey);
    }

    isValidToken() {
        // @todo: implementar lógica para validar o token.
        return true;
    }

    isLoggedIn() {
        return !!this.accessToken
            && typeof this.accessToken !== 'undefined'
            && this.isValidToken();
    }

    getAccessToken() {
        return localStorage.getItem(this.accessTokenKey);
    }

    saveAccessToken(token) {
        localStorage.setItem(this.accessTokenKey, token)
    }

    logout() {
        fetchWithAuth(`${process.env.REACT_APP_API_BASE_URL}logout`, 'POST')
            .then(response => {
                console.log(response);
                localStorage.removeItem(this.accessTokenKey);
            });
    }
}

export default AuthService;