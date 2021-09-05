import React from 'react'

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.redirectToLogin();
    }

    redirectToLogin() {
        return window.location.href=`${process.env.REACT_APP_API_DOMAIN}oauth/authorize?client_id=${process.env.REACT_APP_API_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_API_REDIRECT_URI}&response_type=code&scope=`;
    }

    render() {
        return false;
    }
}

export default Login;