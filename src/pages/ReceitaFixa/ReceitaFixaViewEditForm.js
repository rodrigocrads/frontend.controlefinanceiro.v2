import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import icoMenuEdit from '../../img/edit.png';

class ReceitaFixaViewEditForm extends Component {
    constructor(props) {
        super(props);

        const { id } = this.props.match.params;
        this.state = {
            form: {
                id,
                title: '',
                description: '',
                value: '',
                category: {
                    id: '',
                },
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
        this.retrieveFixedRevenueById();
        this.retrieveCategories();
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

    onChangeCategoryHandler(event) {
        this.setState({
            form: {
                ...this.state.form,
                category: {
                    ...this.state.form.category,
                    [event.target.name]: event.target.value,
                },
            },
        });
    }

    onSubmitHandler(event) {
        event.preventDefault();

        this.update();
    }

    retrieveFixedRevenueById() {
        fetch(`http://localhost:8000/api/fixedRevenue/${this.state.form.id}`)
            .then(response => response.json())
            .then(fixedRevenue => { this.setState({ form: { ...fixedRevenue } })})
            .catch(error => console.log(error));
    }

    retrieveCategories() {
        fetch('http://localhost:8000/api/category')
            .then(response => response.json())
            .then(categories => this.setState({ ...this.state, categories }));
    }

    update() {
        const data = { ...this.state.form }
        const requestInfo = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }),
        };

        fetch(`http://localhost:8000/api/fixedRevenue/${this.state.id}`, requestInfo)
            .then((response) => {
                if (response.status === 200) alert('Receita fixa atualizada com sucesso.');

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

    replacePeriodicty(periodicty) {
        switch(periodicty) {
            case 'quarterly':
                return 'Trimestral';
            case 'semiannual':
                return 'Semestral';
            case 'annual':
                return 'Anual';
            default:
                return 'Mensal';
        }
    }

    render() {
        const activationControl = this.state.form.activation_control;
        const form = this.state.form;

        console.log(this.state);

        return (
            <div>
                <div className="header_walk_links">
                    RECEITA FIXA / ATUALIZAR
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
                                    <input type="text" name="title" value={form.title} onChange={(ev) => this.onChangeHandler(ev)} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>DESCRIÇÃO:</label>
                                <div className="controls">
                                    <input type="text" name="description" value={form.description} onChange={(ev) => this.onChangeHandler(ev)} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>VALOR:</label>
                                <div className="controls">
                                    <input type="text" name="value" value={form.value} onChange={(ev) => this.onChangeHandler(ev)} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>CATEGORIA:</label>
                                <div className="controls">
                                    <select name="category_id" defaultValue={form.category.id} onChange={(ev) => this.onChangeCategoryHandler(ev)}>
                                        {
                                            this.state.categories.map((category) => (
                                                <option select={category.id === form.category.id ? 'selected': ''} value={category.id}>{category.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>DATA INÍCIO ATIVAÇÃO:</label>
                                <div className="controls">
                                    <input type="text" name="start_date" value={activationControl.start_date} onChange={(ev) => this.onChangeActivationControlHandler(ev)} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>DATA FIM ATIVAÇÃO:</label>
                                <div className="controls">
                                    <input type="text" name="end_date" value={activationControl.end_date} onChange={(ev) => this.onChangeActivationControlHandler(ev)} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>DIA ATIVAÇÃO:</label>
                                <div className="controls">
                                    <select name="expiration_day" defaultValue={activationControl.expiration_day} onChange={(ev) => this.onChangeActivationControlHandler(ev)}>
                                        <option value="">Selecione um tipo</option>
                                        {
                                            this.getActivationDays().map((day) => (
                                                <option selected={activationControl.expiration_day === day} value={day}>{day}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>PERIODICIDADE:</label>
                                <div className="controls">
                                    <select name="periodicity" defaultValue={activationControl.periodicity} onChange={(ev) => this.onChangeActivationControlHandler(ev)}>
                                        {
                                            ['monthly', 'quarterly', 'semiannual', 'annual'].map(periodicity => (
                                                <option select={periodicity === activationControl.periodicity} value={periodicity}>{this.replacePeriodicty(periodicity)}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="form-actions">
                                <div className="form-action">
                                    <input type="submit" className="btn" value="Atualizar" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
}

export default withRouter(ReceitaFixaViewEditForm);