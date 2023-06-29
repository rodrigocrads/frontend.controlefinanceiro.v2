import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCategoriesByType } from '../../redux/actions/categoryAction';
import { createEntry, clearSelectedEntry } from '../../redux/actions/entryAction';
import EntryForm from '../../components/Entry/Form';
import SaveOrUpdate from '../../builders/requestBody/entry/SaveOrUpdate';
import Entry from '../../dtos/Entry';
import { Link } from 'react-router-dom';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldShowCategory: false
        };
    }

    componentDidMount() {
        this.props.clearSelectedEntry();
    }

    onSubmitHandler(data) {
        const builderContentRequest = new SaveOrUpdate(
            new Entry({ ...data })
        );
        this.props.createEntry(builderContentRequest.build());
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
                                <h1 className="m-0">Criar novo lançamento</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                                    <li className="breadcrumb-item">Lançamentos / Novo</li>
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
        createEntry,
        clearSelectedEntry,
        fetchCategoriesByType
    }, dispatch)
);

export default connect(null, mapDispatchToProps)(Create);