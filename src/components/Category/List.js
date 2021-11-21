import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteCategory, fetchCategories } from '../../redux/actions/categoryAction';

import icoEdit from '../../img/edit.png';
import icoDelete from '../../img/delete.png';
// import FlashMessage from '../UI/FlashMessage';

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

    // showErrorsMessage() {
    //     return this.state.errors.map(error => (
    //         <FlashMessage
    //             type="danger"
    //             title="Atenção!"
    //             description={error}
    //         />
    //     ));
    // }

    renderNotFoundCategories() {
        return <div>Nenhuma categoria encontrada!</div>;
    }

    renderTable() {
        return (
            <>
                <table className="table">
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
                                        <Link className="table_action" to={`/category/${category.id}`}><img src={icoEdit} /></Link>

                                        <a href="#" onClick={ () => this.deleteCategoryHandler(category.id) } className="table_action">
                                            <img src={icoDelete} />
                                        </a> 
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
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