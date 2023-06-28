import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    updateEntry,
    clearSelectedEntry,
    getEntryById
} from '../../redux/actions/entryAction';
import { fetchCategoriesByType } from '../../redux/actions/categoryAction';
import EntryForm from '../../components/Entry/Form';

import SaveOrUpdate from '../../builders/requestBody/entry/SaveOrUpdate';
import Entry from '../../dtos/Entry';
import icoMenuEdit from '../../img/edit.png';
import { Link } from 'react-router-dom';

class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldShowCategory: true
        };
    }

    componentDidMount() {
        this.props.clearSelectedEntry();

        const id = this.props.match.params.id;
        if (id) {
            this.props.getEntryById(id);
        }
    }

    onSubmitHandler(data) {
        const builderContentRequest = new SaveOrUpdate( new Entry({ ...data }));

        const id = this.props.match.params.id;
        this.props.updateEntry(id, builderContentRequest.build());
        this.props.getEntryById(id);
    }

    onChangeTypeHandler(event) {
        const value = event.target.value;
        console.log(value);

        this.setState({ shouldShowCategory: value !== ''})

        if (value !== '') {
            this.props.fetchCategoriesByType(value);
        }
    }

    render() {
        return (
            <div>
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Atualizar lançamento</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                                    <li className="breadcrumb-item">Lançamentos / Editar</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <EntryForm
                    shouldShowCategory={this.state.shouldShowCategory}
                    onChangeType={(event) => this.onChangeTypeHandler(event)}
                    onSubmit={(data) => this.onSubmitHandler(data)}
                />

            </div>
        );
    };
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        updateEntry,
        fetchCategoriesByType,
        clearSelectedEntry,
        getEntryById,
    }, dispatch)
);

export default withRouter(connect(null, mapDispatchToProps)(Update));