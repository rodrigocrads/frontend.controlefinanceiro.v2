import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import Input from '../reduxFormsUI/Input';
import Select from '../reduxFormsUI/Select';

class FormBase extends Component {
    getCategoryTypeOptions() {
        return [
            { value: '', label: 'Selecione um tipo' },
            { value: 'expense', label: 'Despesa' },
            { value: 'revenue', label: 'Receita' },
        ];
    }

    render() {
        return (
            <>
                <div class="card">
                    <div class="card-header">
                        Informações sobre a categoria
                    </div>
                    <div class="card-body">
                        <form onSubmit={this.props.handleSubmit}>
                            <div className="row">
                                <div className="col-md-4">
                                    <Field
                                        name='name'
                                        component={Input}
                                        label='Nome'
                                        maxLength='100'
                                        required
                                    />
                                </div>

                                <div className="col-md-3">
                                    <Field
                                        name="type"
                                        component={Select}
                                        label="Tipo"
                                        options={ this.getCategoryTypeOptions() }
                                        required
                                    />
                                </div>

                                <div className='col-md-2'>
                                    <button type="submit" className="btn btn-primary btn-lg mt-2 mt-4">Salvar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    };
};



const mapStateToProps = state => ({
    initialValues: state.category.selected,
});

const Form = reduxForm({
    form: 'categoryForm',
    enableReinitialize: true
})(FormBase);

export default connect(mapStateToProps, null)(Form);
