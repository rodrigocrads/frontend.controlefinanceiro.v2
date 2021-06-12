import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard/index.js';
import CategoriaViewList from './pages/Categoria/CategoriaViewList.js';
import CategoriaViewForm from './pages/Categoria/CategoriaViewForm.js';
import CategoriaViewEditForm from './pages/Categoria/CategoriaViewEditForm.js';

import ReceitaFixaViewList from './pages/ReceitaFixa/ReceitaFixaViewList.js';
import ReceitaFixaViewForm from './pages/ReceitaFixa/ReceitaFixaViewForm.js';
import ReceitaFixaViewEditForm from './pages/ReceitaFixa/ReceitaFixaViewEditForm.js';

export default () => {
    return (
        <Switch>
            <Route exact path="/">
                <Dashboard />
            </Route>

            <Route exact path="/categoria">
                <CategoriaViewList />
            </Route>

            <Route exact path="/categoria/criar">
                <CategoriaViewForm />
            </Route>

            <Route exact path="/categoria/atualizar/:id">
                <CategoriaViewEditForm />
            </Route>

            <Route exact path="/receitaFixa">
                <ReceitaFixaViewList />
            </Route>

            <Route exact path="/receitaFixa/criar">
                <ReceitaFixaViewForm />
            </Route>

            <Route exact path="/receitaFixa/atualizar/:id">
                <ReceitaFixaViewEditForm />
            </Route>
        </Switch>
    );
};