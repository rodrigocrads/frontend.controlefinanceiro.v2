import React from 'react'
import { Redirect } from 'react-router-dom';
import AuthService from '../../services/AuthService';

class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.logout();
    }

    logout() {
        const authService = new AuthService();
        authService.logout();
    }

    render() {
        return <Redirect to={{ pathname: '' }} />
    }
}

export default Logout;