import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Input from '../../components/UI/Input';
import TextArea from '../../components/UI/TextArea';
import SaveOrUpdate from '../../builders/requestBody/variableFinancialTransaction/SaveOrUpdate';
import VariableRevenue from '../../dtos/VariableRevenue';
import { convertIsoDateToBr } from '../../helpers/utils';

import icoMenuEdit from '../../img/edit.png';

class ViewVariableRevenueForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                title: '',
                description: '',
                value: '',
                category_id: '',
                register_date: '',
            },
            categories: [],
        };
    }

    componentDidMount() {
        this.retrieveCategories();

        if (this.isToUpdate()) {
            this.retrieveVariableRevenueById();
        }
    }

    retrieveCategories() {
        fetch('http://localhost:8000/api/category')
            .then(response => response.json())
            .then(categories => this.setState({ ...this.state, categories }));
    }

    retrieveVariableRevenueById() {
        fetch(`http://localhost:8000/api/variableRevenue/${this.props.match.params.id}`)
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

    onChangeHandler(event) {
        this.setState({ form: { ...this.state.form, [event.target.name]: event.target.value }});
    }

    onChangeActivationControlHandler(event) {
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

        fetch(`http://localhost:8000/api/variableRevenue/${this.props.match.params.id}`, requestInfo)
            .then((response) => {
                if (response.status === 200) alert('Receita variável atualizada com sucesso.');

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

        fetch('http://localhost:8000/api/variableRevenue', requestInfo)
            .then((response) => {
                if (response.status === 201) alert('Receita variável criada com sucesso!');

                if (response.status === 422) alert(response.statusText);
            })
            .catch((error) => console.log(error));
    }

    render() {
        return (
            <div>
                <div className="header_walk_links">
                    RECEITAS VARIÁVEL / { this.isToUpdate() ? 'ATUALIZAR' : 'CRIAR' }
                </div>

                <div className="widget">
                    <div className="widget_header">
                        <img src={icoMenuEdit} className="ico" alt="Área de criação de Receita variável" />
                        Receita variável
                    </div>

                    <div className="widget_content">
                        <form onSubmit={(ev) => this.onSubmitHandler(ev)}>
                            <Input
                                label='TÍTULO'
                                name='title'
                                value={ this.state.form.title }
                                onChange={ (event) => this.onChangeHandler(event) }
                                maxLength='100'
                                require 
                            />

                            <TextArea
                                label='DESCRIÇÃO:'
                                name='description'
                                value={ this.state.form.description }
                                onChange={ (event) => this.onChangeHandler(event) }
                                maxLength='255' 
                            />

                            <Input
                                label='VALOR:'
                                name='value'
                                value={ this.state.form.value }
                                onChange={ (event) => this.onChangeHandler(event) }
                                require 
                            />

                            <div className="form-group">
                                <label>CATEGORIA:</label>
                                <div className="controls">
                                    <select name="category_id" value={ this.state.form.category_id } onChange={(ev) => this.onChangeHandler(ev)}>
                                        <option value="">Selecione um tipo</option>
                                        {
                                            this.state.categories.map((category) => (
                                                <option key={category.id} value={ category.id }>
                                                    { category.name }
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <Input
                                label='DATA DO REGISTRO:'
                                name='register_date'
                                value={ this.state.form.register_date }
                                onChange={(ev) => this.onChangeHandler(ev)}
                                require 
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