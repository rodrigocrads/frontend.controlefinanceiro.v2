import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';

import icoMenuEdit from '../../img/edit.png';

class CategoriaViewForm extends Component {
    constructor(props) {
        super(props);

        const id = this.props.match.params.id || null;
        this.state = { id,  name: '', type: '' };
    }

    componentDidMount() {
        const id = this.state.id;
        if (id !== null) {
            this.retriveCategoryById(id);
        }
    }

    clearState() {
        this.setState({ name: '', type: ''});
    }

    retriveCategoryById(id) {
        fetch(`http://localhost:8000/api/category/${id}`)
            .then(response => response.json())
            .then(category => { this.setState({ ...category })})
            .catch(error => console.log(error));
    }

    onChangeHandler(event) {
        this.setState({ ...this.state, [event.target.name]: event.target.value });
    }

    onSubmitHandler(event) {
        event.preventDefault();

        this.saveOrUpdate();
    }

    saveOrUpdate() {
        const id = this.state.id;
        if (id !== null) {
            this.update(id);
            return;
        }

        this.save();
    }

    update(id) {
        const data = { ...this.state }
        const requestInfo = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }),
        };

        fetch(`http://localhost:8000/api/category/${id}`, requestInfo)
            .then((response) => {
                if (response.status === 200) alert('Categoria atualizada com sucesso.');

                if (response.status === 422) alert(response.statusText);
            })
            .catch((error) => console.log(error));
    }

    save() {
        const data = { ...this.state }
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }),
        };

        fetch('http://localhost:8000/api/category', requestInfo)
            .then((response) => {
                if (response.status === 201) alert('Categoria criada com sucesso!');

                if (response.status === 422) alert(response.statusText);
            })
            .catch((error) => console.log(error));
    }

    getCategoryTypeOptions() {
        return [
            {value: '', label: 'Selecione um tipo'},
            {value: 'expense', label: 'Despesa'},
            {value: 'revenue', label: 'Receita'},
        ];
    }

    render() {
        return (
            <div>
                <div className="header_walk_links">
                    CATEGORIAS / { this.state.id ? 'ATUALIZAR' : 'CRIAR' }
                </div>

                <div className="widget">
                    <div className="widget_header">
                        <img src={icoMenuEdit} className="ico" alt="Área de criação de categoria" />
                        Criar categoria
                    </div>

                    <div className="widget_content">
                        <form onSubmit={(ev) => this.onSubmitHandler(ev)}>
                            <Input
                                label='NOME:'
                                name='name'
                                value={ this.state.name }
                                maxLength='100'
                                required
                                onChange={ (event) => this.onChangeHandler(event) }
                            />

                            <Select 
                                label="TIPO:"
                                name="type"
                                value={ this.state.type }
                                options={ this.getCategoryTypeOptions() }
                                required
                                onChange={ (event) => this.onChangeHandler(event) }
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

export default withRouter(CategoriaViewForm);