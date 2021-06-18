import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { replacePeriodicity } from '../../helpers/FixedRevenueOrExpense/helper';
import icoList from '../../img/ico-list.png';
import icoEdit from '../../img/edit.png';
import icoDelete from '../../img/delete.png';

export default class ViewFixedExpenseList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fixedExpenses: [],
        };
    }

    componentDidMount() {
        this.fetchCategories();
    }

    resetCategoriesList() {
        this.setState({ fixedExpenses: [] });
        this.fetchCategories();
    }

    fetchCategories() {
        fetch('http://localhost:8000/api/fixedExpense')
            .then(response => response.json())
            .then(fixedExpenses => this.setState({ ...this.state, fixedExpenses }))
            .catch(e => { console.log(e) });
    }

    deleteCategoryHandler(categoryIndex) {
        const isConfirm = window.confirm("Realmente deseja excluir este registro?");
        if (isConfirm) {
            this.deleteCategory(categoryIndex);
        }
    }

    deleteCategory(categoryIndex) {
        fetch(`http://localhost:8000/api/fixedExpense/${categoryIndex}`, { method: 'DELETE' })
            .then((response) => {
                if (response.status === 200) alert('Despesa fixa excluida com sucesso.');

                this.resetCategoriesList();
            })
            .catch((error) => console.log(error));
    }

    renderTable() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>TÍTULO</th>
                        <th>DESCRIÇÃO</th>
                        <th>VALOR</th>
                        <th>CATEGORIA</th>
                        <th>INÍCIO ATIVAÇÃO</th>
                        <th>FIM ATIVAÇÃO</th>
                        <th>DIA DE VENCIMENTO</th>
                        <th>PERIODICIDADE</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.fixedExpenses.map((fixedExpense, index) => (
                            <tr key={ fixedExpense.id }>
                                <td>{ index + 1 }</td>
                                <td>{ fixedExpense.title }</td>
                                <td>{ fixedExpense.description || 'Não Informado' }</td>
                                <td>{ `R$ ${fixedExpense.value}` }</td>
                                <td>{ fixedExpense.category.name }</td>
                                <td>{ fixedExpense.activation_control.start_date }</td>
                                <td>
                                    {
                                        fixedExpense.activation_control.end_date
                                            ? fixedExpense.activation_control.end_date
                                            : 'Indeterminado'
                                    }
                                </td>
                                <td>{ fixedExpense.activation_control.expiration_day }</td>
                                <td>{ replacePeriodicity(fixedExpense.activation_control.periodicity) }</td>
                                <td>
                                    <Link className="table_action" to={`/fixedExpense/${fixedExpense.id}`}><img src={icoEdit} /></Link>

                                    <a href="#" onClick={ () => this.deleteCategoryHandler(fixedExpense.id) } className="table_action">
                                        <img src={icoDelete} />
                                    </a> 
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    }

    renderNotFound() {
        return (
            <div>Nenhuma despesa fixa encontrada!</div>
        );
    }

    render() {
        return (
            <div>
                <div className="header_walk_links">
                    DESPESAS FIXA / LISTAR
                </div>
                <div className="widget">
                    <div className="widget_header">
                        <img src={icoList} className="ico" alt="" />
                        Despesas fixas
                    </div>

                    <div className="widget_content">
                        <div className="table_area">
                            {
                                this.state.fixedExpenses.length > 0
                                ? this.renderTable()
                                : this.renderNotFound()
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}