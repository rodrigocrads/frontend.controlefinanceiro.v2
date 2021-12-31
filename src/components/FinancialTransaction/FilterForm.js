import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteVariableExpense, fetchVariablesExpenses } from '../../redux/actions/variableExpenseAction';
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
                <form onSubmit={ this.props.handleSubmit }>
                    <div className='col_2 float_left'>
                        <Field
                            name='start_date'
                            component={Input}
                            label='Data início:'
                            mask={new DateMask()}
                        />
                    </div>
                    <div className='col_2 float_left'>
                        <Field
                            name='end_date'
                            component={Input}
                            label='Data fim:'
                            mask={new DateMask()}
                        />
                    </div>
                    <div className="col_2 float_left">
                        <Field
                            name='type'
                            component={Select}
                            label='Tipo:'
                            options={[
                                { value: '', label: 'Selecione um tipo' },
                                { value: 'expense', label: 'Despesa' },
                                { value: 'revenue', label: 'Receita' },
                            ]}
                        />
                    </div>

                    <div className="col_2 float_left">
                        <Field
                            name="category_id"
                            component={Select}
                            label="Categoria:"
                            options={getCategoriesSelectOptions(this.props.categories || [])}
                        />
                    </div>

                    <div>
                        <Field
                            name='title'
                            component={Input}
                            label='Título:'
                            maxLength='100'
                        />
                    </div>

                    <div className="form-actions">
                        <div className="form-action">
                            <input type="submit" className="btn" value="Buscar" />
                        </div>
                    </div>
                </form>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        deleteVariableExpense,
        fetchVariablesExpenses,
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
    form: 'variableExpenseFilterForm',
    enableReinitialize: true
})(FilterFormBase);

export default connect(mapStateToProps, mapDispatchToProps)(FilterForm);