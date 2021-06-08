import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import icoMenuEdit from '../../img/edit.png';

class CategoriaViewEditForm extends Component {
    constructor(props) {
        super(props);

        const { id } = this.props.match.params;
        this.state = { id, name: '', type: '' };
    }

    componentDidMount() {
        this.retriveCategoryById();
    }

    onChangeHandler(event) {
        this.setState({ ...this.state, [event.target.name]: event.target.value });
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.updateCategory();
    }

    retriveCategoryById() {
        fetch(`http://localhost:8000/api/category/${this.state.id}`)
            .then(response => response.json())
            .then(category => { this.setState({ ...category })})
            .catch(error => console.log(error));
    }

    updateCategory() {
        const data = { ...this.state }
        const requestInfo = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }),
        };

        fetch(`http://localhost:8000/api/category/${this.state.id}`, requestInfo)
            .then((response) => {
                if (response.status === 200) alert('Categoria atualizada com sucesso.');

                if (response.status === 422) alert(response.statusText);
            })
            .catch((error) => console.log(error));
    }

    render() {
        return (
            <div>
                <div className="header_walk_links">
                    CATEGORIA / EDITAR
                </div>

                <div className="widget">
                    <div className="widget_header">
                        <img src={icoMenuEdit} className="ico" alt="Área de atualização de categoria" />
                        Atualizar categoria
                    </div>

                    <div className="widget_content">
                        <form onSubmit={(ev) => this.onSubmitHandler(ev)}>
                            <div className="form-group">
                                <label>NOME:</label>
                                <div className="controls">
                                    <input type="text" name="name" value={ this.state.name } onChange={(ev) => this.onChangeHandler(ev)} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>TIPO:</label>
                                <div className="controls">
                                    <select name="type" defaultValue={ this.state.type } onChange={(ev) => this.onChangeHandler(ev)}>
                                        {
                                            ['expense', 'revenue'].map(option => (
                                                <option
                                                    selected={ this.state.type === option ? "true" : "false" }
                                                    value={option}
                                                >
                                                    { option === "expense" ? "Despesa" : "Receita" }
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="form-actions">
                                <div className="form-action">
                                    <input type="submit" className="btn" value="ATUALIZAR" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
}

export default withRouter(CategoriaViewEditForm);