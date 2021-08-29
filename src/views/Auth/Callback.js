import { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom';
import queryString from 'query-string'
import AuthService from '../../services/AuthService';

class Callback extends Component
{
    async getAccessToken() {
        const params = queryString.parse(this.props.location.search);
        
        if (!!params['code']) {

            const formData = new FormData();
            formData.append('grant_type', 'authorization_code');
            formData.append('client_id', '1');
            formData.append('code', params['code']);
            formData.append('client_secret', 'lHwlOkefAVJlMm5wnoR54hKlBLn2uVm7GPkxVIGY');
            formData.append('redirect_uri', 'http://localhost:3000/auth/callback');

            const requestInfo = { method: 'POST', body: formData };

            await fetch(`http://localhost:8000/oauth/token`, requestInfo)
                .then(response => response.json())
                .then(data => {
                    if (!!data.access_token) {
                        const authService = new AuthService();
                        authService.saveAccessToken(data.access_token);

                        return authService.getAccessToken();
                    }
                });
        }
    }

    render() {
        const accessToken = this.getAccessToken();

        if (!!accessToken) {
            return <Redirect to={{ pathname: '/' }} />
        }

        return false;
    }
}

export default withRouter(Callback);