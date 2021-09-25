import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import icoList from '../../img/ico-list.png';
import icoEdit from '../../img/edit.png';
import icoDelete from '../../img/delete.png';
import { convertBrDateToIso, convertCurrencyToPtBr, convertIsoDateToBr, fetchWithAuth, getCategoriesSelectOptions } from '../../helpers/utils';
import Select from '../../components/UI/Select';
import Input from '../../components/UI/Input';
import { Date as DateMask } from '../../masks/Date';

export default class ViewVariableExpenseList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            variableExpenses: [],
            categories: [],
            form: {
                title: '',
                category_id: '',
                start_date: '',
                end_date: '',
            }
        };
    }

    componentDidMount() {
        this.fetchVariableExpenses();
        this.fetchCategories();
    }

    resetCategoriesList() {
        this.setState({ variableExpenses: [] });
        this.fetchCategories();
    }

    getQueryParams() {
        const queryParams = [];

        if (this.state.form.title)
            queryParams.push(`params[title]=${this.state.form.title}`);

        if (this.state.form.category_id)
            queryParams.push(`params[category_id]=${this.state.form.category_id}`);

        if (this.state.form.start_date)
            queryParams.push(`params[start_date]=${convertBrDateToIso(this.state.form.start_date)}`);

        if (this.state.form.end_date)
            queryParams.push(`params[end_date]=${convertBrDateToIso(this.state.form.end_date)}`);

        return queryParams;
    }

    buildUrlWithQueryParams(url) {
        const queryParams = this.getQueryParams();

        for(var i = 0; i < queryParams.length; i++) {
            if (i===0) {
                url += queryParams[i];
                continue;
            }

            url += `&${queryParams[i]}`;
        }

        return url;
    }

    fetchVariableExpenses() {
        fetchWithAuth(this.buildUrlWithQueryParams(`${process.env.REACT_APP_API_BASE_URL}variableExpense?`))
            .then(response => response.json())
            .then(variableExpenses => this.setState({ ...this.state, variableExpenses }))
            .catch(e => { console.log(e) });
    }

    fetchCategories() {
        fetchWithAuth(`${process.env.REACT_APP_API_BASE_URL}category?type=expense`)
            .then(response => response.json())
            .then(categories => this.setState({ ...this.state, categories }));
    }

    deleteCategoryHandler(id) {
        const isConfirm = window.confirm("Realmente deseja excluir este registro?");
        if (isConfirm) {
            this.deleteCategory(id);
        }
    }

    deleteCategory(id) {
        fetchWithAuth(`${process.env.REACT_APP_API_BASE_URL}variableExpense/${ id }`, 'DELETE')
            .then((response) => {
                if (response.status === 200) alert('Despesa variável excluida com sucesso.');

                this.resetCategoriesList();
            })
            .catch((error) => console.log(error));
    }

    onSubmitHandler = (event) => {
        event.preventDefault();

        this.fetchVariableExpenses();
    }

    onChangeHandler = (event) => {
        this.setState({ form: { ...this.state.form, [event.target.name]: event.target.value }});
    }

    renderFilterForm() {
        return (
            <form onSubmit={ this.onSubmitHandler }>
                <div className="col_2 float_left">
                    <Input
                        label='TÍTULO:'
                        name='title'
                        value={ this.state.form.title }
                        onChange={ this.onChangeHandler }
                        maxLength='100'
                    />

                    <Select
                        label="CATEGORIA:"
                        name="category_id"
                        value={ this.state.form.category_id }
                        options={ getCategoriesSelectOptions(this.state.categories) }
                        onChange={ this.onChangeHandler }
                    />
                </div>

                <div className="col_2 float_left">
                    <Input
                        label='DATA INÍCIO:'
                        name='start_date'
                        value={ this.state.form.start_date }
                        mask={new DateMask()}
                        onChange={ this.onChangeHandler }
                    />

                    <Input
                        label='DATA FIM:'
                        name='end_date'
                        value={ this.state.form.end_date }
                        mask={new DateMask()}
                        onChange={ this.onChangeHandler }
                    />
                </div>

                <div className="form-actions">
                    <div className="form-action">
                        <input type="submit" className="btn" value="Buscar" />
                    </div>
                </div>
            </form>
        );
    }

    renderTable() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>TÍTULO</th>
                        <th>DESCRIÇÃO</th>
                        <th>VALOR</th>
                        <th>DATA DO REGISTRO</th>
                        <th>CATEGORIA</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.variableExpenses.map((variableExpense, index) => (
                            <tr key={ variableExpense.id }>
                                <td>{ index + 1 }</td>
                                <td>{ variableExpense.title }</td>
                                <td>{ variableExpense.description || 'Não Informado' }</td>
                                <td>{ convertCurrencyToPtBr(variableExpense.value) }</td>
                                <td>{ convertIsoDateToBr(variableExpense.register_date) }</td>
                                <td>{ variableExpense.category.name }</td>
                                <td>
                                    <Link className="table_action" to={`/variableExpense/${ variableExpense.id }`}>
                                        <img src={ icoEdit } />
                                    </Link>

                                    <a href="#" onClick={ () => this.deleteCategoryHandler(variableExpense.id) } className="table_action">
                                        <img src={icoDelete} />
                                    </a> 
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    }

    render() {
        const foundLength = this.state.variableExpenses.length;
        return (
            <div>
                <div className="header_walk_links">
                    DESPESAS VARIÁVEIS / LISTAR
                </div>
                <div className="widget">
                    <div className="widget_header">
                        <img src={icoList} className="ico" alt="" />
                        Despesas variáveis
                    </div>

                    <div className="widget_content">
                        <div className="filter_area">
                            <h3>Filtros de busca:</h3>
                            <br />
                            { this.renderFilterForm() }
                        </div>

                        <div className="table_area">
                            <p>Encontrados: { foundLength === 1 ? `${foundLength} registro` : `${foundLength} registros` }, com o valor total de: { convertCurrencyToPtBr(this.state.variableExpenses.reduce((total, item) => item.value + total, 0)) } </p>
                            <br />

                            { this.state.variableExpenses.length > 0 ? this.renderTable() : '' }
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}