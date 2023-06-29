import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './views/Dashboard/index';
import ViewCategoryList from './views/Category/List';
import ViewCategoryCreate from './views/Category/Create';
import ViewCategoryUpdate from './views/Category/Update';

import ViewEntryList from './views/Entry/List';
import ViewEntryCreate from './views/Entry/Create';
import ViewEntryUpdate from './views/Entry/Update';

import PrivateRoute from './PrivateRoute';
import Login from './views/Login';
import Callback from './views/Auth/Callback';
import Logout from './views/Logout';
import MyAccount from './views/MyAccount';

const routes = () => {
    return (
        <Switch>
            <Route exact path="/login">
                <Login />
            </Route>

            <Route exact path="/logout">
                <Logout />
            </Route>

            <Route exact path="/auth/callback">
                <Callback />
            </Route>

            <PrivateRoute exact path="/">
                <Dashboard />
            </PrivateRoute>

            <PrivateRoute exact path="/category/list">
                <ViewCategoryList />
            </PrivateRoute>

            <PrivateRoute exact path="/category/">
                <ViewCategoryCreate />
            </PrivateRoute>

            <PrivateRoute path="/category/:id">
                <ViewCategoryUpdate />
            </PrivateRoute>

            <PrivateRoute exact path="/entry/list">
                <ViewEntryList />
            </PrivateRoute>

            <PrivateRoute exact path="/entry">
                <ViewEntryCreate />
            </PrivateRoute>

            <PrivateRoute exact path="/entry/:id">
                <ViewEntryUpdate />
            </PrivateRoute>

            <PrivateRoute path="/user-account">
                <MyAccount />
            </PrivateRoute>

            <Route path='*' exact>
                <Login />
            </Route>
        </Switch>
    );
};

export default routes;