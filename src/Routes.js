import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './views/Dashboard/index';
import ViewCategoryList from './views/Category/List';
import ViewCategoryCreate from './views/Category/Create';
import ViewCategoryUpdate from './views/Category/Update';

import ViewVariableRevenueList from './views/VariableRevenue/List';
import ViewVariableRevenueCreate from './views/VariableRevenue/Create';
import ViewVariableRevenueUpdate from './views/VariableRevenue/Update';

import ViewVariableExpenseList from './views/VariableExpense/List';
import ViewVariableExpenseCreate from './views/VariableExpense/Create';
import ViewVariableExpenseUpdate from './views/VariableExpense/Update';
import PrivateRoute from './PrivateRoute';
import Login from './views/Login';
import Callback from './views/Auth/Callback';
import Logout from './views/Logout';

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

            <PrivateRoute exact path="/variableRevenue/list">
                <ViewVariableRevenueList />
            </PrivateRoute>

            <PrivateRoute exact path="/variableRevenue">
                <ViewVariableRevenueCreate />
            </PrivateRoute>

            <PrivateRoute exact path="/variableRevenue/:id">
                <ViewVariableRevenueUpdate />
            </PrivateRoute>

            <PrivateRoute exact path="/variableExpense/list">
                <ViewVariableExpenseList />
            </PrivateRoute>

            <PrivateRoute exact path="/variableExpense">
                <ViewVariableExpenseCreate />
            </PrivateRoute>

            <PrivateRoute exact path="/variableExpense/:id">
                <ViewVariableExpenseUpdate />
            </PrivateRoute>
        </Switch>
    );
};

export default routes;