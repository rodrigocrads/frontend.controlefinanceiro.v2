import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import AuthService from './services/AuthService';

class PrivateRoute extends React.Component {

    isLoggedIn() {
        const authService = new AuthService();
        return authService.isLoggedIn();
    }

    render() {
        return (
            <Route {...this.props} >
                {
                    this.isLoggedIn()
                        ? this.props.children
                        : <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />
                }
            </Route>
        )
    }
}

export default PrivateRoute