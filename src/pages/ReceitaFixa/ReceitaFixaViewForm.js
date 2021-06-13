import React, { Component } from 'react';

import icoMenuEdit from '../../img/edit.png';

export default class ReceitaFixaViewForm extends Component {
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
        fetch('http://localhost:8000/api/category')
            .then(response => response.json())
            .then(categories => this.setState({ ...this.state, categories }));
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
        this.save();
    }

    save() {
        const data = { ...this.state.form }
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(data),
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

    getActivationDays() {
        return [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
            11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21, 22, 23, 24, 25, 26, 27, 28
        ];
    }

    render() {
        return (
            <div>
                <div className="header_walk_links">
                    RECEITA FIXA / CRIAR
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
                                    <input type="text" name="description" value={this.state.form.description} onChange={(ev) => this.onChangeHandler(ev)} />
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
                                    <select name="category_id" defaultValue={this.state.form.category_id} onChange={(ev) => this.onChangeHandler(ev)}>
                                        <option value="">Selecione um tipo</option>
                                        {
                                            this.state.categories.map((category) => (
                                                <option value={category.id}>{category.name}</option>
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
                                    <select name="periodicity" defaultValue={this.state.form.activation_control.periodicity} onChange={(ev) => this.onChangeActivationControlHandler(ev)}>
                                        <option value="">Selecione um tipo</option>
                                        <option value="monthly">Mensal</option>
                                        <option value="quarterly">Trimestral</option>
                                        <option value="semiannual">Semestral</option>
                                        <option value="annual">Anual</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>DIA ATIVAÇÃO:</label>
                                <div className="controls">
                                    <select name="expiration_day" defaultValue={this.state.form.activation_control.expiration_day} onChange={(ev) => this.onChangeActivationControlHandler(ev)}>
                                        <option value="">Selecione um tipo</option>
                                        {
                                            this.getActivationDays().map((day) => (
                                                <option value={day}>{day}</option>
                                            ))
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