import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Input from '../../components/UI/Input';
import TextArea from '../../components/UI/TextArea';
import Select from '../../components/UI/Select';

import SaveOrUpdate from '../../builders/requestBody/variableFinancialTransaction/SaveOrUpdate';
import { convertIsoDateToBr, getCategoriesSelectOptions } from '../../helpers/utils';
import VariableExpense from '../../dtos/VariableExpense';

import icoMenuEdit from '../../img/edit.png';
import { Currency } from '../../masks/Currency';
import { Date as DateMask } from '../../masks/Date';

class ViewVariableExpenseForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                title: '',
                description: '',
                value: '',
                register_date: '',
                category_id: '',
            },
            categories: [],
        };
    }

    componentDidMount() {
        this.retrieveCategories();

        if (this.isToUpdate()) {
            this.retrieveVariableExpenseById();
        }
    }

    retrieveCategories() {
        fetch('http://localhost:8000/api/category?type=expense')
            .then(response => response.json())
            .then(categories => this.setState({ ...this.state, categories }));
    }

    retrieveVariableExpenseById() {
        fetch(`http://localhost:8000/api/variableExpense/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    form: {
                        ...data,
                        register_date: convertIsoDateToBr(data.register_date),
                        category_id: data.category.id,
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

    onSubmitHandler = (event) => {
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
            new VariableExpense({ ...this.state.form })
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

        fetch(`http://localhost:8000/api/variableExpense/${this.props.match.params.id}`, requestInfo)
            .then((response) => {
                if (response.status === 200) alert('Despesa variável atualizada com sucesso.');

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

        fetch('http://localhost:8000/api/variableExpense', requestInfo)
            .then((response) => {
                if (response.status === 201) alert('Despesa variável criada com sucesso!');

                if (response.status === 422) alert(response.statusText);
            })
            .catch((error) => console.log(error));
    }

    render() {
        return (
            <div>
                <div className="header_walk_links">
                    DESPESAS VARIÁVEIS / { this.isToUpdate() ? 'ATUALIZAR' : 'CRIAR' }
                </div>

                <div className="widget">
                    <div className="widget_header">
                        <img src={icoMenuEdit} className="ico" alt="Área de criação de Despesa variável" />
                        Despesa variável
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
                                label='DATA DO REGISTRO:'
                                name='register_date'
                                value={ this.state.form.register_date }
                                mask={new DateMask()}
                                onChange={ this.onChangeHandler }
                                required
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

export default withRouter(ViewVariableExpenseForm);