import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import icoMenuEdit from '../../img/edit.png';

class ReceitaFixaViewEditForm extends Component {
    constructor(props) {
        super(props);

        const { id } = this.props.match.params;
        this.state = {
            id,
            title: '',
            description: '',
            value: '',
            activation_control: {
                start_date: '',
                end_date: '',
                activation_type: '',
                activation_day: '',
            }
        };
    }

    componentDidMount() {
        this.retriveFixedRevenueById();
    }

    onChangeHandler(event) {
        this.setState({ ...this.state, [event.target.name]: event.target.value });
    }

    onChangeActivationControlHandler(event) {
        this.setState({
            ...this.state,
            activation_control: {
                ...this.state.activation_control,
                [event.target.name]: event.target.value,
            }
        });
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.update();
    }

    retriveFixedRevenueById() {
        fetch(`http://localhost:8000/api/fixedRevenue/${this.state.id}`)
            .then(response => response.json())
            .then(fixedRevenue => { this.setState({ ...fixedRevenue })})
            .catch(error => console.log(error));
    }

    update() {
        const data = { ...this.state }
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

    replaceActivationType(activationType) {
        switch(activationType) {
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

    replaceDate(dateString) {

        if (!dateString) return '';

        return new Date(dateString)
            .toISOString()
            .substr(0, 10)
            .split('-')
            .reverse()
            .join('/')
    }

    render() {
        const activationControl = this.state.activation_control;
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
                                    <input type="text" name="title" value={this.state.title} onChange={(ev) => this.onChangeHandler(ev)} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>DESCRIÇÃO:</label>
                                <div className="controls">
                                    <input type="text" name="description" value={this.state.description} onChange={(ev) => this.onChangeHandler(ev)} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>VALOR:</label>
                                <div className="controls">
                                    <input type="text" name="value" value={this.state.value} onChange={(ev) => this.onChangeHandler(ev)} />
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
                                    <select name="activation_day" defaultValue={activationControl.activation_day} onChange={(ev) => this.onChangeActivationControlHandler(ev)}>
                                        <option value="">Selecione um tipo</option>
                                        {
                                            this.getActivationDays().map((day) => (
                                                <option selected={activationControl.activation_day === day} value={day}>{day}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>PERIODICIDADE:</label>
                                <div className="controls">
                                    <select name="activation_type" defaultValue={activationControl.activation_type} onChange={(ev) => this.onChangeActivationControlHandler(ev)}>
                                        {
                                            ['monthly', 'quarterly', 'semiannual', 'annual'].map(activation_type => (
                                                <option select={activation_type === activationControl.activation_type} value="monthly">{this.replaceActivationType(activationControl.activation_type)}</option>
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

export default withRouter(ReceitaFixaViewEditForm);