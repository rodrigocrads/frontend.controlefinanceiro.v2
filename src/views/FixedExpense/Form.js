import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Input from '../../components/UI/Input';
import TextArea from '../../components/UI/TextArea';
import Select from '../../components/UI/Select';

import SaveOrUpdate from '../../builders/requestBody/fixedFinancialTransaction/SaveOrUpdate';
import FixedExpense from '../../dtos/FixedExpense';

import {
    convertIsoDateToBr,
    getCategoriesSelectOptions,
    getPeriodicitySelectOptions,
    getExpirationDaysSelectOptions,
} from '../../helpers/utils';

import icoMenuEdit from '../../img/edit.png';
import { Currency } from '../../masks/Currency';
import { Date as DateMask } from '../../masks/Date';

const INIT_STATE = {
    form: {
        title: '',
        description: '',
        value: '',
        category_id: '',
        activation_control: {
            start_date: '',
            end_date: '',
            periodicity: '',
            expiration_day: '',
        },
    },
    errors: [],
    categories: [],
    id: undefined,
};

class ViewFixedExpenseForm extends Component {
    constructor(props) {
        super(props);

        this.state = INIT_STATE;
    }

    componentDidMount() {
        if (this.isToUpdate()) {
            this.setState({...this.state, id: this.getIdFromUrl()});
            this.retrieveFixedExpenseBy(this.getIdFromUrl());
        }

        this.retrieveCategories();
    }

    componentDidUpdate() {
        if (!this.isToUpdate() && this.hasValueInStateId()) {
            this.setState({ ...INIT_STATE });

            this.retrieveCategories();
        }
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

    retrieveCategories() {
        fetch(`${process.env.REACT_APP_API_BASE_URL}category?type=expense`)
            .then(response => response.json())
            .then(categories => this.setState({ ...this.state, categories }));
    }

    retrieveFixedExpenseBy(id) {
        fetch(`${process.env.REACT_APP_API_BASE_URL}fixedExpense/${id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    form: {
                        ...data,
                        category_id: data.category.id,
                        activation_control: {
                            ...data.activation_control,
                            start_date: convertIsoDateToBr(data.activation_control.start_date),
                            end_date: convertIsoDateToBr(data.activation_control.end_date),
                        }
                    }
                })
            });
    }

    onChangeHandler = (event) => {
        this.setState({ form: { ...this.state.form, [event.target.name]: event.target.value }});
    }

    onChangeActivationControlHandler = (event) => {
        this.setState({
            form: {
                ...this.state.form,
                activation_control: {
                    ...this.state.form.activation_control,
                    [event.target.name]: event.target.value,
                },
            },
        });
    }

    onSubmitHandler = (event) => {
        event.preventDefault();

        this.saveOrUpdate();
    }

    saveOrUpdate() {
        if (this.isToUpdate() && this.hasValueInStateId()) {
            this.update(this.getIdFromUrl());
            return;
        }

        this.save();
    }

    getBuildRequestContent() {
        const builderContentRequest = new SaveOrUpdate(
            new FixedExpense({ ...this.state.form })
        );

        return builderContentRequest.build();
    }

    update(id) {
        const requestInfo = {
            method: 'PUT',
            body: JSON.stringify(this.getBuildRequestContent()),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }),
        };

        fetch(`${process.env.REACT_APP_API_BASE_URL}fixedExpense/${id}`, requestInfo)
            .then((response) => {
                if (response.status === 200) {
                    alert('Registro atualizado com sucesso!');
                };

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

        fetch(`${process.env.REACT_APP_API_BASE_URL}fixedExpense`, requestInfo)
            .then((response) => {
                if (response.status === 201) {
                    alert('Registro criado com sucesso!');
                };

                if (response.status === 422) {
                    response.json().then(data => this.setState({ ...this.state, errors: data || [] }))
                };
            });
    }

    render() {
        const { errors } = this.state;
        const activationControlErrors = errors.activation_control || [];

        return (
            <div>
                <div className="header_walk_links">
                    DESPESAS FIXAS / { this.isToUpdate() ? 'ATUALIZAR' : 'CRIAR' }
                </div>

                <div className="widget">
                    <div className="widget_header">
                        <img src={icoMenuEdit} className="ico" alt="Área de criação de despesa fixa" />
                        Despesa fixa
                    </div>

                    <div className="widget_content">
                        <form onSubmit={(ev) => this.onSubmitHandler(ev)}>
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
                                label='DATA INÍCIO ATIVAÇÃO:'
                                name='start_date'
                                value={ this.state.form.activation_control.start_date }
                                mask={ new DateMask() }
                                onChange={ this.onChangeActivationControlHandler }
                                required
                                errors={ (activationControlErrors.start_date || []) }
                            />

                            <Input
                                label='DATA FIM ATIVAÇÃO:'
                                name='end_date'
                                value={ this.state.form.activation_control.end_date }
                                mask={ new DateMask() }
                                onChange={ this.onChangeActivationControlHandler }
                                errors={ (activationControlErrors.end_date || []) }
                            />

                            <Select 
                                label="PERIODICIDADE:"
                                name="periodicity"
                                value={ this.state.form.activation_control.periodicity }
                                options={ getPeriodicitySelectOptions() }
                                required
                                onChange={ this.onChangeActivationControlHandler }
                                errors={ (activationControlErrors.periodicity || []) }
                            />

                            <Select 
                                label="DIA DO VENCIMENTO:"
                                name="expiration_day"
                                value={ this.state.form.activation_control.expiration_day }
                                options={ getExpirationDaysSelectOptions() }
                                required
                                onChange={ this.onChangeActivationControlHandler }
                                errors={ (activationControlErrors.expiration_day || []) }
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

export default withRouter(ViewFixedExpenseForm);