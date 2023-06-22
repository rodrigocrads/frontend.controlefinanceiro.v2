import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCategoriesByType } from '../../redux/actions/categoryAction';
import { createEntry, clearSelectedEntry } from '../../redux/actions/entryAction';
import EntryForm from '../../components/Entry/Form';
import icoMenuEdit from '../../img/edit.png';
import SaveOrUpdate from '../../builders/requestBody/entry/SaveOrUpdate';
import Entry from '../../dtos/Entry';

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
                <div className="header_walk_links">
                    LANÇAMENTOS / CRIAR
                </div>

                <div className="widget">
                    <div className="widget_header">
                        <img src={icoMenuEdit} className="ico" alt="Área de criação de registro de transação" />
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
        createEntry,
        clearSelectedEntry,
        fetchCategoriesByType
    }, dispatch)
);

export default connect(null, mapDispatchToProps)(Create);