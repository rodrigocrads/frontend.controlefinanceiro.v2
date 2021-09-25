import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import icoList from '../../img/ico-list.png';
import icoEdit from '../../img/edit.png';
import icoDelete from '../../img/delete.png';
import { convertCurrencyToPtBr, convertIsoDateToBr, fetchWithAuth, getCategoriesSelectOptions } from '../../helpers/utils';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import { Date as DateMask } from '../../masks/Date';

export default class ViewVariableRevenueList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            variableRevenues: [],
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
        this.fetchVariableRevenues();
        this.fetchCategories();
    }

    resetVariableRevenueList() {
        this.setState({ variableRevenues: [] });
        this.fetchVariableRevenues();
    }

    getQueryParams() {
        const queryParams = [];

        if (this.state.form.title)
            queryParams.push(`params[title]=${this.state.form.title}`);

        if (this.state.form.category_id)
            queryParams.push(`params[category_id]=${this.state.form.category_id}`);

        if (this.state.form.start_date)
            queryParams.push(`params[start_date]=${this.state.form.start_date}`);

        if (this.state.form.end_date)
            queryParams.push(`params[end_date]=${this.state.form.end_date}`);

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

    fetchCategories() {
        fetchWithAuth(`${process.env.REACT_APP_API_BASE_URL}category?type=revenue`)
            .then(response => response.json())
            .then(categories => this.setState({ ...this.state, categories }));
    }

    fetchVariableRevenues() {
        fetchWithAuth(this.buildUrlWithQueryParams(`${process.env.REACT_APP_API_BASE_URL}variableRevenue?`))
            .then(response => response.json())
            .then(variableRevenues => this.setState({ ...this.state, variableRevenues }))
            .catch(e => { console.log(e) });
    }

    deleteCategoryHandler(id) {
        const isConfirm = window.confirm("Realmente deseja excluir este registro?");
        if (isConfirm) {
            this.deleteCategory(id);
        }
    }

    deleteCategory(id) {
        fetchWithAuth(`${process.env.REACT_APP_API_BASE_URL}variableRevenue/${ id }`, 'DELETE')
            .then((response) => {
                if (response.status === 200) alert('Receita fixa excluida com sucesso.');

                this.resetVariableRevenueList();
            })
            .catch((error) => console.log(error));
    }

    onSubmitHandler = (event) => {
        event.preventDefault();

        this.fetchVariableRevenues();
    }

    onChangeHandler = (event) => {
        this.setState({ form: { ...this.state.form, [event.target.name]: event.target.value }});
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
                        this.state.variableRevenues.map((variableRevenue, index) => (
                            <tr key={ variableRevenue.id }>
                                <td>{ index + 1 }</td>
                                <td>{ variableRevenue.title }</td>
                                <td>{ variableRevenue.description || 'Não Informado' }</td>
                                <td>{ convertCurrencyToPtBr(variableRevenue.value) }</td>
                                <td>{ convertIsoDateToBr(variableRevenue.register_date) }</td>
                                <td>{ variableRevenue.category.name }</td>
                                <td>
                                    <Link className="table_action" to={`/variableRevenue/${ variableRevenue.id }`}>
                                        <img src={ icoEdit } />
                                    </Link>

                                    <a href="#" onClick={ () => this.deleteCategoryHandler(variableRevenue.id) } className="table_action">
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

    render() {
        const foundLength = this.state.variableRevenues.length;
        return (
            <div>
                <div className="header_walk_links">
                    RECEITAS VARIÁVEIS / LISTAR
                </div>
                <div className="widget">
                    <div className="widget_header">
                        <img src={icoList} className="ico" alt="" />
                        Receitas variáveis
                    </div>

                    <div className="widget_content">
                        <div className="filter_area">
                            <h3>Filtros de busca:</h3>
                            <br />
                            { this.renderFilterForm() }
                        </div>

                        <div className="table_area">
                            <p>Encontrados: { foundLength === 1 ? `${foundLength} registro` : `${foundLength} registros` }, com o valor total de: { convertCurrencyToPtBr(this.state.variableRevenues.reduce((total, item) => item.value + total, 0)) } </p>
                            <br />

                            { this.state.variableRevenues.length > 0 ? this.renderTable() : '' }
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}