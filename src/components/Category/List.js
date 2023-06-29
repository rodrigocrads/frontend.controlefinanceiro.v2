import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteCategory, fetchCategories } from '../../redux/actions/categoryAction';

class List extends Component {
    componentDidMount() {
        this.props.fetchCategories();
    }

    deleteCategoryHandler(id) {
        const isConfirm = window.confirm("Realmente deseja excluir este registro?");
        if (isConfirm) {
            this.props.deleteCategory(id);
        }
    }

    renderNotFoundCategories() {
        return <div>Nenhuma categoria encontrada!</div>;
    }

    renderTable() {
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body table-responsive p-0">
                                <table className="table table-hover text-nowrap">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nome</th>
                                            <th>Tipo</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { 
                                            this.props.categories.map((category, index) => (
                                                <tr key={ category.id }>
                                                    <td>{ index + 1 }</td>
                                                    <td>{ category.name }</td>
                                                    <td>{ category.type === 'expense' ? 'Despesa' : 'Receita' }</td>
                                                    <td>
                                                        <Link
                                                            className="btn btn-info btn-rounded btn-sm waves-effect waves-light"
                                                            to={`/category/${category.id}`}
                                                        >
                                                            EDITAR
                                                        </Link>
                                                        
                                                        <a
                                                            href="#"
                                                            className="btn btn-danger btn-sm btn-rounded buttonDelete waves-effect waves-light ml-1"
                                                            onClick={ () => this.deleteCategoryHandler(category.id) }
                                                        >
                                                            EXCLUIR
                                                        </a> 
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    render() {
        const hasSomeCategories = this.props.categories.length > 0;
        return hasSomeCategories
            ? this.renderTable()
            : this.renderNotFoundCategories();
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        deleteCategory,
        fetchCategories,
}, dispatch));

const mapStateToProps = state => ({
    categories: state.category.all,
});

export default connect(mapStateToProps, mapDispatchToProps)(List);