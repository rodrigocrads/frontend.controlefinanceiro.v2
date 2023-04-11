import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import CategoryForm from '../../components/Category/Form';
import icoMenuEdit from '../../img/edit.png';
import { bindActionCreators } from 'redux';
import { updateCategory } from '../../redux/actions/categoryAction';
import { getCategoryById, clearSelectedCategory } from '../../redux/actions/categoryAction';

class Update extends Component {
    componentDidMount() {
        this.props.clearSelectedCategory();

        const { id } = this.props.match.params;
        this.props.getCategoryById(id);
    }

    onSubmitHandler(data) {
        const { id } = this.props.match.params;
        this.props.updateCategory(id, data);
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
                            onSubmit={(data) => this.onSubmitHandler(data)}
                        />
                    </div>
                </div>
            </div>
        );
    };
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        updateCategory,
        getCategoryById,
        clearSelectedCategory,
    }, dispatch)
);

export default withRouter(connect(null, mapDispatchToProps)(Update));