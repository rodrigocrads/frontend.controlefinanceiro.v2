import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { getFinancialTransactionById, clearSelectedFinancialTransaction } from '../../redux/actions/financialTransactionAction';
import { fetchCategoriesByType } from '../../redux/actions/categoryAction';
import Input from '../reduxFormsUI/Input';
import Select from '../reduxFormsUI/Select';
import { convertIsoDateToBr, getCategoriesSelectOptions } from '../../helpers/utils';
import { Date as DateMask } from '../../masks/Date';
import { Currency } from '../../masks/Currency';
import TextArea from '../reduxFormsUI/TextArea';

class FormBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fieldTypeWasSelected: false,
        };
    }

    handleChangeType(event) {
        const value = event.target.value;
        const fieldTypeWasSelected = value !== '';

        this.setState({ fieldTypeWasSelected });

        if (fieldTypeWasSelected) {
            this.props.fetchCategoriesByType(value);
        }
    }

    shouldShowCategoryField() {
        return this.state.fieldTypeWasSelected || this.props.isUpdate;
    }

    render() {
        return (
            <>
                <form onSubmit={ this.props.handleSubmit }>
                    <Field
                        name="type"
                        component={Select}
                        label="Tipo:"
                        onChange={(e) => this.handleChangeType(e)}
                        options={[
                            {value: '', label: 'Selecione um tipo' },
                            {value: 'expense', label: 'Despesa' },
                            {value: 'revenue', label: 'Receita' },
                        ]}
                        required
                    />

                    {
                        this.shouldShowCategoryField() && (
                            <Field
                                name="category_id"
                                component={Select}
                                label="Categoria:"
                                options={getCategoriesSelectOptions(this.props.categories)}
                                required
                            />
                        )
                    }

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
        getFinancialTransactionById,
        clearSelectedFinancialTransaction,
        fetchCategoriesByType,
    }, dispatch)
);

const mapStateToProps = state => ({
    initialValues: {
        ...state.financialTransaction.selected,
        register_date: convertIsoDateToBr(state.financialTransaction.selected?.register_date),
        category_id: state.financialTransaction.selected?.category?.id,
    },
    categories: state.category.all,
});

const Form = reduxForm({
    form: 'financialTransactionForm',
    enableReinitialize: true
})(FormBase);

export default connect(mapStateToProps, mapDispatchToProps)(Form);
