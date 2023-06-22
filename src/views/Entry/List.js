import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import icoList from '../../img/ico-list.png';
import {
    convertBrDateToIso,
    getCurrentDateBrFormat,
    getLastDayOfMonth
} from '../../helpers/utils';
import EntryList from '../../components/Entry/List';
import FilterForm from '../../components/Entry/FilterForm';
import { fetchEntries } from '../../redux/actions/entryAction';
import { fetchCategories } from '../../redux/actions/categoryAction';

class List extends Component {
    componentDidMount() {
        this.props.fetchCategories();

        this.props.fetchEntries([
            `params[start_date]=${convertBrDateToIso(
                getCurrentDateBrFormat(1)
            )}`,
            `params[end_date]=${convertBrDateToIso(
                getCurrentDateBrFormat(
                    getLastDayOfMonth()
                )
            )}`
        ]);
    }

    onSubmitFilterFormHandler = (data) => {
        const params = this.getParams(data);

        this.props.fetchEntries(params);
    }

    getParams(data) {
        const params = [];

        if (data.title) params.push(`params[title]=${data.title}`);

        if (data.category_id) params.push(`params[category_id]=${data.category_id}`);

        if (data.start_date) params.push(`params[start_date]=${convertBrDateToIso(data.start_date)}`);

        if (data.end_date) params.push(`params[end_date]=${convertBrDateToIso(data.end_date)}`);

        if (data.type) params.push(`params[type]=${data.type}`);

        return params;
    }

    render() {
        return (
            <div>
                <div className="header_walk_links">
                    TRANSAÇÕES FINANCEIRAS / LISTAR
                </div>
                <div className="widget">
                    <div className="widget_header">
                        <img src={ icoList } className="ico" alt="" />
                        Transações financeiras
                    </div>

                    <div className="widget_content">
                        <div className="filter_area">
                            <h3>Filtros de busca:</h3>
                            <br />
                            <FilterForm onSubmit={(data) => this.onSubmitFilterFormHandler(data)} />
                        </div>

                        <div className="table_area">
                            <EntryList />
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        fetchEntries,
        fetchCategories,
    }, dispatch)
);

export default connect(null, mapDispatchToProps)(List);