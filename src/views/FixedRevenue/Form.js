import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Input from '../../components/UI/Input';
import TextArea from '../../components/UI/TextArea';
import Select from '../../components/UI/Select';

import FixedRevenue from '../../dtos/FixedRevenue';
import SaveOrUpdate from '../../builders/requestBody/fixedFinancialTransaction/SaveOrUpdate';

import { convertIsoDateToBr, getCategoriesSelectOptions, getPeriodicitySelectOptions, getExpirationDaysSelectOptions } from '../../helpers/utils';
import icoMenuEdit from '../../img/edit.png';
import { Currency } from '../../masks/Currency';
import { Date as DateMask } from '../../masks/Date';

class ViewFixedRevenueForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
                }
            },
            categories: [],
        };
    }

    componentDidMount() {
        this.retrieveCategories();

        if (this.isToUpdate()) {
            this.retrieveFixedRevenueById();
        }
    }

    retrieveCategories() {
        fetch('http://localhost:8000/api/category?type=revenue')
            .then(response => response.json())
            .then(categories => this.setState({ ...this.state, categories }));
    }

    retrieveFixedRevenueById() {
        fetch(`http://localhost:8000/api/fixedRevenue/${this.props.match.params.id}`)
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
            })
            .catch(error => console.log(error));
    }

    isToUpdate() {
        return this.props.match.params.id !== undefined;
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

    onSubmitHandler(event) {
        event.preventDefault();

        this.saveOrUpdate();
    }

    saveOrUpdate() {
        if (this.isToUpdate()) {
            this.update();
            return;
        }

        this.save();
    }

    getBuildRequestContent() {
        const builderContentRequest = new SaveOrUpdate(
            new FixedRevenue({ ...this.state.form })
        );

        return builderContentRequest.build();
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

        fetch(`http://localhost:8000/api/fixedRevenue/${this.props.match.params.id}`, requestInfo)
            .then((response) => {
                if (response.status === 200) alert('Receita fixa atualizada com sucesso.');

                if (response.status === 422) alert(response.statusText);
            })
            .catch((error) => console.log(error));
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

        fetch('http://localhost:8000/api/fixedRevenue', requestInfo)
            .then((response) => {
                if (response.status === 201) alert('Receita fixa criada com sucesso!');

                if (response.status === 422) alert(response.statusText);
            })
            .catch((error) => console.log(error));
    }

    render() {
        return (
            <div>
                <div className="header_walk_links">
                    RECEITAS FIXAS / { this.isToUpdate() ? 'ATUALIZAR' : 'CRIAR' }
                </div>

                <div className="widget">
                    <div className="widget_header">
                        <img src={icoMenuEdit} className="ico" alt="Área de criação de Receita fixa" />
                        Receita fixa
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
                            />

                            <TextArea
                                label='DESCRIÇÃO:'
                                name='description'
                                value={ this.state.form.description }
                                onChange={ this.onChangeHandler }
                                maxLength='255' 
                            />

                            <Input
                                label='VALOR:'
                                name='value'
                                mask={new Currency()}
                                value={ this.state.form.value }
                                onChange={ this.onChangeHandler }
                                required
                            />

                            <Select 
                                label="CATEGORIA:"
                                name="category_id"
                                value={ this.state.form.category_id }
                                options={ getCategoriesSelectOptions(this.state.categories) }
                                required
                                onChange={ this.onChangeHandler }
                            />

                            <Input
                                label='DATA INÍCIO ATIVAÇÃO:'
                                name='start_date'
                                value={ this.state.form.activation_control.start_date }
                                mask={ new DateMask() }
                                onChange={ this.onChangeActivationControlHandler }
                                required
                            />

                            <Input
                                label='DATA FIM ATIVAÇÃO:'
                                name='end_date'
                                value={ this.state.form.activation_control.end_date }
                                mask={ new DateMask() }
                                onChange={ this.onChangeActivationControlHandler }
                            />

                            <Select 
                                label="PERIODICIDADE:"
                                name="periodicity"
                                value={ this.state.form.activation_control.periodicity }
                                options={ getPeriodicitySelectOptions() }
                                required
                                onChange={ this.onChangeActivationControlHandler }
                            />

                            <Select 
                                label="DIA DO VENCIMENTO:"
                                name="expiration_day"
                                value={ this.state.form.activation_control.expiration_day }
                                options={ getExpirationDaysSelectOptions() }
                                required
                                onChange={ this.onChangeActivationControlHandler }
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

export default withRouter(ViewFixedRevenueForm);