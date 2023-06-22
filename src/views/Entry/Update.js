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
                <div className="header_walk_links">
                    LANÇAMENTOS / ATUALIZAR
                </div>

                <div className="widget">
                    <div className="widget_header">
                        <img src={icoMenuEdit} className="ico" alt="Área de atualização do registro de transação financeira" />
                        Lançamento
                    </div>

                    <div className="widget_content">
                        <EntryForm
                            shouldShowCategory={this.state.shouldShowCategory}
                            onChangeType={(event) => this.onChangeTypeHandler(event)}
                            onSubmit={(data) => this.onSubmitHandler(data)}
                        />
                    </div>
                </div>
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