import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import CategoryForm from '../../components/Category/Form';
import icoMenuEdit from '../../img/edit.png';
import { fetchWithAuth } from '../../helpers/utils';

class Create extends Component {
    onSubmitHandler(data) {
        this.save(data);
    }

    save(data) {
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

    render() {
        return (
            <div>
                <div className="header_walk_links">
                    CATEGORIAS / CRIAR
                </div>

                <div className="widget">
                    <div className="widget_header">
                        <img src={icoMenuEdit} className="ico" alt="Área de criação de categoria" />
                        Categoria
                    </div>

                    <div className="widget_content">
                        <CategoryForm onSubmit={(data) => this.onSubmitHandler(data)} />
                    </div>
                </div>
            </div>
        );
    };
}

export default withRouter(connect(null, null)(Create));