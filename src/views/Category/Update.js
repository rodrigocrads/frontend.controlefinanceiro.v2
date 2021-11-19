import React, { Component } from 'react';
import { withRouter } from 'react-router';
import CategoryForm from '../../components/Category/Form';
import icoMenuEdit from '../../img/edit.png';
import { fetchWithAuth } from '../../helpers/utils';

class Update extends Component {
    onSubmitHandler(data) {
        const { id } = this.props.match.params;

        fetchWithAuth(`${process.env.REACT_APP_API_BASE_URL}category/${id}`, 'PUT', data)
            .then((response) => {
                if (response.status === 200) {
                    alert('Categoria atualizada com sucesso.');
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
                    CATEGORIAS / ATUALIZAR
                </div>

                <div className="widget">
                    <div className="widget_header">
                        <img src={icoMenuEdit} className="ico" alt="Área de atualização da categoria" />
                        Categoria
                    </div>

                    <div className="widget_content">
                        <CategoryForm
                            onSubmit={ (data) => this.onSubmitHandler(data) }
                            id={ this.props.match.params.id }
                        />
                    </div>
                </div>
            </div>
        );
    };
}

export default withRouter(Update);