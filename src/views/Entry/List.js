import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    convertBrDateToIso,
    getCurrentDateBrFormat,
    getLastDayOfMonth
} from '../../helpers/utils';
import EntryList from '../../components/Entry/List';
import FilterForm from '../../components/Entry/FilterForm';
import { fetchEntries } from '../../redux/actions/entryAction';
import { fetchCategories } from '../../redux/actions/categoryAction';
import { Link } from 'react-router-dom';

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
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Lista de lançamentos</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                                    <li className="breadcrumb-item">Lançamentos / Listar</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <FilterForm
                    onSubmit={(data) => this.onSubmitFilterFormHandler(data)}
                />

                <EntryList />
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