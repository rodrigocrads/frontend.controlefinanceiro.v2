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
                <div class="card">
                    <div class="card-header">
                        Informações sobre o lançamento
                    </div>
                    <div class="card-body">
                        <form onSubmit={ props.handleSubmit }>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <Field
                                        name='title'
                                        component={Input}
                                        label='Título'
                                        maxLength='100'
                                        required
                                    />
                                </div>

                                <div className="col-md-2">
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
                                </div>

                                <div className='col-md-2'>
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
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-md-3'>
                                    <Field
                                        name='value'
                                        component={Input}
                                        label='Valor'
                                        mask={new Currency()}
                                        required
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <Field
                                        name='register_date'
                                        component={Input}
                                        label='Data do registro'
                                        mask={new DateMask()}
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className='row'>
                                <div className='col-md-4'>
                                    <Field
                                        name='description'
                                        component={TextArea}
                                        label='Descrição'
                                        maxLength='255'
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg mt-2" >Salvar</button>
                        </form>
                    </div>
                </div>
            </>
        );
    };
};

const mapStateToProps = state => ({
    initialValues: {
        ...state.entry.selected,
        register_date: convertIsoDateToBr(state.entry.selected?.register_date),
        category_id: state.entry.selected?.category?.id,
    },
    categories: state.category.all,
});

const Form = reduxForm({
    form: 'entryForm',
    enableReinitialize: true
})(FormBase);

export default connect(mapStateToProps, null)(Form);
