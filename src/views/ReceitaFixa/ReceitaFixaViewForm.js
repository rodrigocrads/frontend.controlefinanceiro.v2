import React, { Component } from 'react';
import { withRouter } from 'react-router';
import FixedRevenue from '../../dtos/FixedRevenue';

import { replacePeriodicity, getExpirationDays } from '../../helpers/utils';
import icoMenuEdit from '../../img/edit.png';
import FixedRevenueBuilderRequest from '../../builders/FixedRevenueBuilderRequest';

class ReceitaFixaViewForm extends Component {
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
        fetch('http://localhost:8000/api/category')
            .then(response => response.json())
            .then(categories => this.setState({ ...this.state, categories }));
    }

    retrieveFixedRevenueById() {
        fetch(`http://localhost:8000/api/fixedRevenue/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ form: { ...data, category_id: data.category.id } })
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

    saveOrUpdate() {
        if (this.isToUpdate()) {
            this.update();
            return;
        }

        this.save();
    }

    update() {
        const requestBuilder = new FixedRevenueBuilderRequest(
            new FixedRevenue({ ...this.state.form })
        );

        const requestInfo = {
            method: 'PUT',
            body: JSON.stringify(requestBuilder.getRequest()),
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
        const requestBuilder = new FixedRevenueBuilderRequest(
            new FixedRevenue({ ...this.state.form })
        );

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(requestBuilder.getRequest()),
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
                    RECEITA FIXA / { this.isToUpdate() ? 'ATUALIZAR' : 'CRIAR' }
                </div>

                <div className="widget">
                    <div className="widget_header">
                        <img src={icoMenuEdit} className="ico" alt="Área de criação de Receita fixa" />
                        Receita fixa
                    </div>

                    <div className="widget_content">
                        <form onSubmit={(ev) => this.onSubmitHandler(ev)}>
                            <div className="form-group">
                                <label>TÍTULO:</label>
                                <div className="controls">
                                    <input type="text" name="title" value={this.state.form.title} onChange={(ev) => this.onChangeHandler(ev)} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>DESCRIÇÃO:</label>
                                <div className="controls">
                                    <textarea name="description" value={this.state.form.description} onChange={(ev) => this.onChangeHandler(ev)} ></textarea>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>VALOR:</label>
                                <div className="controls">
                                    <input type="text" name="value" value={this.state.form.value} onChange={(ev) => this.onChangeHandler(ev)} />
                                </div>
                            </div>

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

                            <div className="form-group">
                                <label>DATA INÍCIO ATIVAÇÃO:</label>
                                <div className="controls">
                                    <input type="text" name="start_date" value={this.state.form.activation_control.start_date} onChange={(ev) => this.onChangeActivationControlHandler(ev)} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>DATA FIM ATIVAÇÃO:</label>
                                <div className="controls">
                                    <input type="text" name="end_date" value={this.state.form.activation_control.end_date} onChange={(ev) => this.onChangeActivationControlHandler(ev)} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>PERIODICIDADE:</label>
                                <div className="controls">
                                    <select name="periodicity" value={this.state.form.activation_control.periodicity} onChange={(ev) => this.onChangeActivationControlHandler(ev)}>
                                        <option value="">Selecione um tipo</option>
                                        {
                                            ['monthly', 'quarterly', 'semiannual', 'annual'].map(periodicity => (
                                                <option key={periodicity} value={periodicity}>{replacePeriodicity(periodicity)}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>DIA ATIVAÇÃO:</label>
                                <div className="controls">
                                    <select name="expiration_day" value={this.state.form.activation_control.expiration_day} onChange={(ev) => this.onChangeActivationControlHandler(ev)}>
                                        <option value="">Selecione um tipo</option>
                                        {
                                            getExpirationDays().map(day => <option key={day} value={day}>{day}</option>)
                                        }
                                    </select>
                                </div>
                            </div>

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

export default withRouter(ReceitaFixaViewForm);