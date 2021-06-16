import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard/index.js';
import CategoriaViewList from './views/Categoria/CategoriaViewList.js';
import CategoriaViewForm from './views/Categoria/CategoriaViewForm.js';
import CategoriaViewEditForm from './views/Categoria/CategoriaViewEditForm.js';

import ReceitaFixaViewList from './views/ReceitaFixa/ReceitaFixaViewList.js';
import ReceitaFixaViewForm from './views/ReceitaFixa/ReceitaFixaViewForm.js';
import ReceitaFixaViewEditForm from './views/ReceitaFixa/ReceitaFixaViewEditForm.js';

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