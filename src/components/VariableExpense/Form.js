import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { getVariableExpenseById, clearSelectedVariableExpense } from '../../redux/actions/variableExpenseAction';
import { fetchCategoriesByType } from '../../redux/actions/categoryAction';
import Input from '../reduxFormsUI/Input';
import Select from '../reduxFormsUI/Select';
import { convertIsoDateToBr, getCategoriesSelectOptions } from '../../helpers/utils';
import { Date as DateMask } from '../../masks/Date';
import { Currency } from '../../masks/Currency';
import TextArea from '../reduxFormsUI/TextArea';

class FormBase extends Component {
    render() {
        return (
            <>
                <form onSubmit={ this.props.handleSubmit }>
                    <Field
                        name='title'
                        component={Input}
                        label='Título:'
                        maxLength='100'
                        required
                    />

                    <Field
                        name='description'
                        component={TextArea}
                        label='Descrição:'
                        maxLength='255'
                    />

                    <Field
                        name='value'
                        component={Input}
                        label='Valor:'
                        mask={new Currency()}
                        required
                    />

                    <Field
                        name="category_id"
                        component={Select}
                        label="Categoria:"
                        options={getCategoriesSelectOptions(this.props.categories)}
                        required
                    />

                    <Field
                        name='register_date'
                        component={Input}
                        label='Data do registro:'
                        mask={new DateMask()}
                        required
                    />

                    <div className="form-actions">
                        <div className="form-action">
                            <input type="submit" className="btn" value="Salvar" />
                        </div>
                    </div>
                </form>
            </>
        );
    };
};

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        getVariableExpenseById,
        clearSelectedVariableExpense,
        fetchCategoriesByType,
    }, dispatch)
);

const mapStateToProps = state => ({
    initialValues: {
        ...state.variableExpense.selected,
        register_date: convertIsoDateToBr(state.variableExpense.selected?.register_date),
        category_id: state.variableExpense.selected?.category?.id,
    },
    categories: state.category.expenseType,
});

const Form = reduxForm({
    form: 'variableExpenseForm',
    enableReinitialize: true
})(FormBase);

export default connect(mapStateToProps, mapDispatchToProps)(Form);
