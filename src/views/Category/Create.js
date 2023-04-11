import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoryForm from '../../components/Category/Form';
import icoMenuEdit from '../../img/edit.png';
import { bindActionCreators } from 'redux';
import { createCategory, clearSelectedCategory } from '../../redux/actions/categoryAction';

class Create extends Component {
    componentDidMount() {
        this.props.clearSelectedCategory();
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
                        <CategoryForm onSubmit={(data) => this.props.createCategory(data)} />
                    </div>
                </div>
            </div>
        );
    };
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({ createCategory, clearSelectedCategory }, dispatch)
);

export default connect(null, mapDispatchToProps)(Create);