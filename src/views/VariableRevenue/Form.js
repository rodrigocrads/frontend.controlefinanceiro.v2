import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Input from '../../components/UI/Input';
import TextArea from '../../components/UI/TextArea';
import Select from '../../components/UI/Select';

import SaveOrUpdate from '../../builders/requestBody/variableFinancialTransaction/SaveOrUpdate';
import VariableRevenue from '../../dtos/VariableRevenue';
import { convertIsoDateToBr, getCategoriesSelectOptions } from '../../helpers/utils';

import icoMenuEdit from '../../img/edit.png';
import { Currency } from '../../masks/Currency';
import { Date as DateMask } from '../../masks/Date';

const INIT_STATE = {
    form: {
        title: '',
        description: '',
        value: '',
        register_date: '',
        category_id: '',
    },
    errors: [],
    categories: [],
    id: undefined,
};

class ViewVariableRevenueForm extends Component {
    constructor(props) {
        super(props);

        this.state = INIT_STATE;
    }

    componentDidMount() {
        if (this.isToUpdate()) {
            this.setState({...this.state, id: this.getIdFromUrl()});
            this.retrieveVariableRevenueById(this.getIdFromUrl());
        }

        this.retrieveCategories();
    }

    componentDidUpdate() {
        if (!this.isToUpdate() && this.hasValueInStateId()) {
            this.setState({ ...INIT_STATE });

            this.retrieveCategories();
        }
    }

    retrieveCategories() {
        fetch(`${process.env.REACT_APP_API_BASE_URL}category?type=revenue`)
            .then(response => response.json())
            .then(categories => this.setState({ ...this.state, categories }));
    }

    retrieveVariableRevenueById(id) {
        fetch(`${process.env.REACT_APP_API_BASE_URL}variableRevenue/${id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    form: {
                        ...data,
                        register_date: convertIsoDateToBr(data.register_date),
                        category_id: data.category.id,
                    } 
                })
            });
    }

    getIdFromUrl() {
        return this.props.match.params.id;
    }

    hasValueInStateId() {
        return !!this.state.id;
    }

    isToUpdate() {
        return !!this.props.match.params.id;
    }

    onChangeHandler = (event) => {
        this.setState({ form: { ...this.state.form, [event.target.name]: event.target.value }});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();

        this.saveOrUpdate();
    }

    getBuildRequestContent() {
        const builderContentRequest = new SaveOrUpdate(
            new VariableRevenue({ ...this.state.form })
        );

        return builderContentRequest.build();
    }

    saveOrUpdate() {
        if (this.isToUpdate()) {
            this.update();
            return;
        }

        this.save();
    }

    update() {
        const requestInfo = {
            method: 'PUT',
            body: JSON.stringify(this.getBuildRequestContent()),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }),
        };

        fetch(`${process.env.REACT_APP_API_BASE_URL}variableRevenue/${this.state.id}`, requestInfo)
            .then((response) => {
                if (response.status === 200) {
                    alert('Registro atualizado com sucesso.');
                }

                if (response.status === 422) {
                    response.json().then(data => this.setState({ ...this.state, errors: data || [] }))
                };
            });
    }

    save() {
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(this.getBuildRequestContent()),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }),
        };

        fetch(`${process.env.REACT_APP_API_BASE_URL}variableRevenue`, requestInfo)
            .then((response) => {
                if (response.status === 201) {
                    alert('Registro criado com sucesso!');
                }

                if (response.status === 422) {
                    response.json().then(data => this.setState({ ...this.state, errors: data || [] }))
                };
            });
    }

    render() {
        const { errors } = this.state;

        return (
            <div>
                <div className="header_walk_links">
                    RECEITAS VARIÁVEIS / { this.isToUpdate() ? 'ATUALIZAR' : 'CRIAR' }
                </div>

                <div className="widget">
                    <div className="widget_header">
                        <img src={icoMenuEdit} className="ico" alt="Área de criação de Receita variável" />
                        Receita variável
                    </div>

                    <div className="widget_content">
                        <form onSubmit={ this.onSubmitHandler }>
                            <Input
                                label='TÍTULO:'
                                name='title'
                                value={ this.state.form.title }
                                onChange={ this.onChangeHandler }
                                maxLength='100'
                                required
                                errors={ errors.title }
                            />

                            <TextArea
                                label='DESCRIÇÃO:'
                                name='description'
                                value={ this.state.form.description }
                                onChange={ this.onChangeHandler }
                                maxLength='255'
                                errors={ errors.description }
                            />

                            <Input
                                label='VALOR:'
                                name='value'
                                mask={ new Currency() }
                                value={ this.state.form.value }
                                onChange={ this.onChangeHandler }
                                required
                                errors={ errors.value }
                            />

                            <Select 
                                label="CATEGORIA:"
                                name="category_id"
                                value={ this.state.form.category_id }
                                options={ getCategoriesSelectOptions(this.state.categories) }
                                required
                                onChange={ this.onChangeHandler }
                                errors={ errors.category_id }
                            />

                            <Input
                                label='DATA DO REGISTRO:'
                                name='register_date'
                                value={ this.state.form.register_date }
                                mask={new DateMask()}
                                onChange={ this.onChangeHandler }
                                required
                                errors={ errors.register_date }
                            />

                            <div className="form-actions">
                                <div className="form-action">
                                    <input type="submit" className="btn" value="Salvar" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
}

export default withRouter(ViewVariableRevenueForm);