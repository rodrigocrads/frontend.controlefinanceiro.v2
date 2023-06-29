import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteEntry, fetchEntries } from '../../redux/actions/entryAction';
import { fetchCategories } from '../../redux/actions/categoryAction';
import Input from '../reduxFormsUI/Input';
import Select from '../reduxFormsUI/Select';
import { getCategoriesSelectOptions, getCurrentDateBrFormat, getLastDayOfMonth } from '../../helpers/utils';
import { Date as DateMask } from '../../masks/Date';
import { Field, reduxForm } from 'redux-form';

class FilterFormBase extends Component {
    render() {
        return (
            <>
                <div class="card">
                    <div class="card-header">
                        Filtros de busca
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                <i className="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <form onSubmit={ this.props.handleSubmit }>
                            <div className='row'>
                                <div className="col-md-3">
                                    <Field
                                        name='start_date'
                                        component={Input}
                                        label='Data início'
                                        mask={new DateMask()}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <Field
                                        name='end_date'
                                        component={Input}
                                        label='Data fim'
                                        mask={new DateMask()}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <Field
                                        name='type'
                                        component={Select}
                                        label='Tipo'
                                        options={[
                                            { value: '', label: 'Todos' },
                                            { value: 'expense', label: 'Despesa' },
                                            { value: 'revenue', label: 'Receita' },
                                        ]}
                                    />
                                </div>

                                <div className="col-md-2">
                                    <Field
                                        name="category_id"
                                        component={Select}
                                        label="Categoria"
                                        options={getCategoriesSelectOptions(this.props.categories || [], 'Todas')}
                                    />
                                </div>
                                <div className='col-md-1'>
                                    <button type="submit" className="btn btn-primary btn-lg mt-4">Buscar</button>
                                </div>
                            </div>

                            
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        deleteEntry,
        fetchEntries,
        fetchCategories,
}, dispatch));

const mapStateToProps = state => ({
    categories: state.category.all,
    initialValues: {
        title: '',
        category_id: '',
        start_date: getCurrentDateBrFormat("01"),
        end_date: getCurrentDateBrFormat(getLastDayOfMonth()),
        type: '',
    },
});

const FilterForm = reduxForm({
    form: 'EntryFilterForm',
    enableReinitialize: true
})(FilterFormBase);

export default connect(mapStateToProps, mapDispatchToProps)(FilterForm);