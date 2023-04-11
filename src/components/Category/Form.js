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
                <form onSubmit={this.props.handleSubmit}>
                    <Field
                        name='name'
                        component={Input}
                        label='Nome'
                        maxLength='100'
                        required
                    />

                    <Field
                        name="type"
                        component={Select}
                        label="Tipo"
                        options={ this.getCategoryTypeOptions() }
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
    initialValues: state.category.selected,
});

const Form = reduxForm({
    form: 'categoryForm',
    enableReinitialize: true
})(FormBase);

export default connect(mapStateToProps, null)(Form);
