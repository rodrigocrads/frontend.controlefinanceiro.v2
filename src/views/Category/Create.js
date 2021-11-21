import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoryForm from '../../components/Category/Form';
import icoMenuEdit from '../../img/edit.png';
import { bindActionCreators } from 'redux';
import { createCategory } from '../../redux/actions/categoryAction';

class Create extends Component {
    onSubmitHandler(data) {
        this.props.createCategory(data);
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

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({ createCategory }, dispatch)
);

export default connect(null, mapDispatchToProps)(Create);