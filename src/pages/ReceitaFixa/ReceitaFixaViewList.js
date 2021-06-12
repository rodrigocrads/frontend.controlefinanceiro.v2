import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import icoList from '../../img/ico-list.png';
import icoEdit from '../../img/edit.png';
import icoDelete from '../../img/delete.png';

export default class ReceitaFixaViewList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fixedRevenues: [],
        };
    }

    componentDidMount() {
        this.fetchCategories();
    }

    resetCategoriesList() {
        this.setState({ fixedRevenues: [] });
        this.fetchCategories();
    }

    fetchCategories() {
        fetch('http://localhost:8000/api/fixedRevenue')
            .then(response => response.json())
            .then(fixedRevenues => this.setState({ ...this.state, fixedRevenues }))
            .catch(e => { console.log(e) });
    }

    deleteCategoryHandler(categoryIndex) {
        const isConfirm = window.confirm("Realmente deseja excluir este registro?");
        if (isConfirm) {
            this.deleteCategory(categoryIndex);
        }
    }

    deleteCategory(categoryIndex) {
        fetch(`http://localhost:8000/api/fixedRevenue/${categoryIndex}`, { method: 'DELETE' })
            .then((response) => {
                if (response.status === 200) alert('Receita fixa excluida com sucesso.');

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
                        <th>INÍCIO ATIVAÇÃO</th>
                        <th>FIM ATIVAÇÃO</th>
                        <th>DIA DA ATIVAÇÃO</th>
                        <th>PERIODICIDADE</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.fixedRevenues.map((fixedRevenue, index) => (
                            <tr key={ index + fixedRevenue.id }>
                                <td>{ index + 1 }</td>
                                <td>{ fixedRevenue.title }</td>
                                <td>{ fixedRevenue.description || 'Não Informado' }</td>
                                <td>{ `R$ ${fixedRevenue.value}` }</td>
                                <td>{ this.replaceDate(fixedRevenue.activation_control.start_date) }</td>
                                <td>
                                    {
                                        fixedRevenue.activation_control.end_date
                                            ? this.replaceDate(fixedRevenue.activation_control.end_date)
                                            : 'Indeterminado'
                                    }
                                </td>
                                <td>{ fixedRevenue.activation_control.activation_day }</td>
                                <td>{ this.replaceActivationType(fixedRevenue.activation_control.activation_type) }</td>
                                <td>
                                    <Link className="table_action" to={`/receitaFixa/atualizar/${fixedRevenue.id}`}><img src={icoEdit} /></Link>

                                    <a href="#" onClick={ () => this.deleteCategoryHandler(fixedRevenue.id) } className="table_action">
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

    replaceDate(dateString) {
        return new Date(dateString)
            .toISOString()
            .substr(0, 10)
            .split('-')
            .reverse()
            .join('/')
    }

    replaceActivationType(activationType) {
        switch(activationType) {
            case 'quarterly':
                return 'Trimestral';
            case 'semiannual':
                return 'Semestral';
            case 'annual':
                return 'Anual';
            default:
                return 'Mensal';
        }
    }

    renderNotFound() {
        return (
            <div>Nenhuma receita fixa encontrada!</div>
        );
    }

    render() {
        return (
            <div>
                <div className="header_walk_links">
                    RECEITA FIXA / LISTAR
                </div>
                <div className="widget">
                    <div className="widget_header">
                        <img src={icoList} className="ico" alt="" />
                        Receitas fixas
                    </div>

                    <div className="widget_content">
                        <div className="table_area">
                            {
                                this.state.fixedRevenues.length > 0
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