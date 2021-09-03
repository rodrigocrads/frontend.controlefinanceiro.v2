import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import { fetchWithAuth } from '../../helpers/utils';

import icoMenuEdit from '../../img/edit.png';

const INIT_STATE = { id: '',  name: '', type: '' };

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = INIT_STATE;
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        if (!!id) {
            this.setState({...this.state, id })
            this.retrieveCategoryBy(id);
        }
    }

    componentDidUpdate() {
        const { id } = this.props.match.params;

        if (!id && this.state.id) {
            this.setState({ ...INIT_STATE, id });
        }
    }

    retrieveCategoryBy(id) {
        fetchWithAuth(`${process.env.REACT_APP_API_BASE_URL}category/${id}`)
            .then(response => response.json())
            .then(category => { this.setState({ ...category })})
    }

    onChangeHandler(event) {
        this.setState({ ...this.state, [event.target.name]: event.target.value });
    }

    onSubmitHandler(event) {
        event.preventDefault();

        this.saveOrUpdate();
    }

    saveOrUpdate() {
        const { id } = this.state;
        if (!!id) {
            this.update(id);
            return;
        }

        this.save();
    }

    update(id) {
        const data = { ...this.state }
        fetchWithAuth(`${process.env.REACT_APP_API_BASE_URL}category/${id}`, 'PUT', data)
            .then((response) => {
                if (response.status === 200) {
                    alert('Categoria atualizada com sucesso.');
                }

                if (response.status === 422) {
                    alert(response.statusText);
                }
            })
    }

    save() {
        const data = { ...this.state }
        fetchWithAuth(`${process.env.REACT_APP_API_BASE_URL}category`, 'POST', data)
            .then((response) => {
                if (response.status === 201) {
                    alert('Categoria criada com sucesso!');
                }

                if (response.status === 422) {
                    alert(response.statusText);
                }
            });
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
                        Categoria
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

export default withRouter(Form);