import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard/index.js';
import CategoriaViewList from './pages/Categoria/CategoriaViewList.js';
import CategoriaViewForm from './pages/Categoria/CategoriaViewForm.js';
import CategoriaViewEditForm from './pages/Categoria/CategoriaViewEditForm.js';

export default () => {
    return (
        <Switch>
            <Route exact path="/">
                <Dashboard />
            </Route>

            <Route exact path="/categoria">
                <CategoriaViewList />
            </Route>

            <Route exact path="/categoria/cadastrar">
                <CategoriaViewForm />
            </Route>

            <Route exact path="/categoria/atualizar/:id">
                <CategoriaViewEditForm />
            </Route>
        </Switch>
    );
};