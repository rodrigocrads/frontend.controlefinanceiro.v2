import React, { Component } from 'react';

import icoMenuEdit from '../../img/edit.png';

export default class ReceitaFixaViewForm extends Component {
    constructor(props) {
        super(props);

        this.state = { name: '', type: '' };
    }

    onChangeHandler(event) {
        this.setState({ ...this.state, [event.target.name]: event.target.value });
    }

    onSubmitHandler(event) {
        event.preventDefault();

        this.saveCategory();
    }

    saveCategory() {
        const data = { ...this.state }
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
                if (response.status === 201) alert('Categoria criada com sucesso!');

                if (response.status === 422) alert(response.statusText);
            })
            .catch((error) => console.log(error));
    }

    render() {
        return (
            <div>
                <div className="header_walk_links">
                    RECEITA FIXA / CADASTRAR
                </div>

                <div className="widget">
                    <div className="widget_header">
                        <img src={icoMenuEdit} className="ico" alt="Área de criação de categoria" />
                        Criar receita fixa
                    </div>

                    <div className="widget_content">
                        <form onSubmit={(ev) => this.onSubmitHandler(ev)}>
                            <div className="form-group">
                                <label>NOME:</label>
                                <div className="controls">
                                    <input type="text" name="name" value={this.state.name} onChange={(ev) => this.onChangeHandler(ev)} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>TIPO:</label>
                                <div className="controls">
                                    <select name="type" defaultValue={this.state.type} onChange={(ev) => this.onChangeHandler(ev)}>
                                        <option value="">Selecione um tipo</option>
                                        <option value="expense">Despesa</option>
                                        <option value="revenue">Receita</option>
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