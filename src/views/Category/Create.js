import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoryForm from '../../components/Category/Form';
import { bindActionCreators } from 'redux';
import { createCategory, clearSelectedCategory } from '../../redux/actions/categoryAction';
import { Link } from 'react-router-dom';

class Create extends Component {
    componentDidMount() {
        this.props.clearSelectedCategory();
    }

    render() {
        return (
            <div>
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Criar nova categoria</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                                <li className="breadcrumb-item">Categorias / Novo</li>
                            </ol>
                        </div>
                        </div>
                    </div>
                </div>

                <CategoryForm onSubmit={(data) => this.props.createCategory(data)} />
            </div>
        );
    };
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({ createCategory, clearSelectedCategory }, dispatch)
);

export default connect(null, mapDispatchToProps)(Create);