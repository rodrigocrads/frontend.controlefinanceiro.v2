import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import Input from '../reduxFormsUI/Input';
import Select from '../reduxFormsUI/Select';
import { convertIsoDateToBr, getCategoriesSelectOptions } from '../../helpers/utils';
import { Date as DateMask } from '../../masks/Date';
import { Currency } from '../../masks/Currency';
import TextArea from '../reduxFormsUI/TextArea';

class FormBase extends Component {
    render() {
        const { props } = this;
        return (
            <>
                <form onSubmit={ props.handleSubmit }>
                    <Field
                        name="type"
                        component={Select}
                        label="Tipo"
                        onChange={props.onChangeType}
                        options={[
                            {value: '', label: 'Selecione um tipo' },
                            {value: 'expense', label: 'Despesa' },
                            {value: 'revenue', label: 'Receita' },
                        ]}
                        required
                    />

                    {
                        props.shouldShowCategory && (
                            <Field
                                name="category_id"
                                component={Select}
                                label="Categoria"
                                options={getCategoriesSelectOptions(props.categories)}
                                required
                            />
                        )
                    }

                    <Field
                        name='title'
                        component={Input}
                        label='Título'
                        maxLength='100'
                        required
                    />

                    <Field
                        name='description'
                        component={TextArea}
                        label='Descrição'
                        maxLength='255'
                    />

                    <Field
                        name='value'
                        component={Input}
                        label='Valor'
                        mask={new Currency()}
                        required
                    />

                    <Field
                        name='register_date'
                        component={Input}
                        label='Data do registro'
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

export default connect(mapStateToProps, null)(Form);
