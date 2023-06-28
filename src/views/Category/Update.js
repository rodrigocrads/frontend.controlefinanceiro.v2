import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import CategoryForm from '../../components/Category/Form';
import { bindActionCreators } from 'redux';
import { updateCategory } from '../../redux/actions/categoryAction';
import { getCategoryById, clearSelectedCategory } from '../../redux/actions/categoryAction';
import { Link } from 'react-router-dom';

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
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Editar categoria</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                                <li className="breadcrumb-item">Categorias / Editar</li>
                            </ol>
                        </div>
                        </div>
                    </div>
                </div>

                <CategoryForm
                    onSubmit={(data) => this.onSubmitHandler(data)}
                />
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