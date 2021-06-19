import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard/index.js';
import CategoriaViewList from './views/Categoria/CategoriaViewList.js';
import CategoriaViewForm from './views/Categoria/CategoriaViewForm.js';

import ReceitaFixaViewList from './views/ReceitaFixa/ReceitaFixaViewList.js';
import ReceitaFixaViewForm from './views/ReceitaFixa/ReceitaFixaViewForm.js';

import ViewFixedExpenseList from './views/FixedExpense/List.js';
import ViewFixedExpenseForm from './views/FixedExpense/Form.js';

import ViewVariableRevenueList from './views/VariableRevenue/List.js';
import ViewVariableRevenueForm from './views/VariableRevenue/Form.js';

import ViewVariableExpenseList from './views/VariableExpense/List.js';
import ViewVariableExpenseForm from './views/VariableExpense/Form.js';

const routes = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Dashboard />
            </Route>

            <Route exact path="/categoria/listar">
                <CategoriaViewList />
            </Route>

            <Route exact path="/categoria">
                <CategoriaViewForm />
            </Route>

            <Route exact path="/categoria/:id">
                <CategoriaViewForm />
            </Route>

            <Route exact path="/receitaFixa/listar">
                <ReceitaFixaViewList />
            </Route>

            <Route exact path="/receitaFixa">
                <ReceitaFixaViewForm />
            </Route>

            <Route exact path="/receitaFixa/:id">
                <ReceitaFixaViewForm />
            </Route>

            <Route exact path="/fixedExpense/list">
                <ViewFixedExpenseList />
            </Route>

            <Route exact path="/fixedExpense">
                <ViewFixedExpenseForm />
            </Route>

            <Route exact path="/fixedExpense/:id">
                <ViewFixedExpenseForm />
            </Route>

            <Route exact path="/variableRevenue/list">
                <ViewVariableRevenueList />
            </Route>

            <Route exact path="/variableRevenue">
                <ViewVariableRevenueForm />
            </Route>

            <Route exact path="/variableRevenue/:id">
                <ViewVariableRevenueForm />
            </Route>

            <Route exact path="/variableExpense/list">
                <ViewVariableExpenseList />
            </Route>

            <Route exact path="/variableExpense">
                <ViewVariableExpenseForm />
            </Route>

            <Route exact path="/variableExpense/:id">
                <ViewVariableExpenseForm />
            </Route>
        </Switch>
    );
};

export default routes;