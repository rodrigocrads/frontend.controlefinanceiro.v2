import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard/index.js';
import CategoriaViewList from './views/Categoria/CategoriaViewList.js';
import CategoriaViewForm from './views/Categoria/CategoriaViewForm.js';

import ReceitaFixaViewList from './views/ReceitaFixa/ReceitaFixaViewList.js';
import ReceitaFixaViewForm from './views/ReceitaFixa/ReceitaFixaViewForm.js';

export default () => {
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
        </Switch>
    );
};