import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import formTypes from '../../redux/formTypes';
import Input from '../reduxFormsUI/Input';

class ChangePasswordForm extends Component {
    render() {
        return (
            <>
                <form onSubmit={this.props.handleSubmit}>
                    <Field
                        type="password"
                        name='old_password'
                        component={Input}
                        label='Senha atual:'
                        placeholder='Informe a senha atual'
                        maxLength='50'
                        required
                    />

                    <Field
                        type="password"
                        name='new_password'
                        component={Input}
                        label='Nova senha:'
                        placeholder='Informe a nova senha'
                        maxLength='50'
                        required
                    />

                    <div className="form-actions">
                        <div className="form-action">
                            <input type="submit" className="btn" value="Atualizar senha" />
                        </div>
                    </div>
                </form>
            </>
        );
    };
};

const Form = reduxForm({
    form: formTypes.CHANGE_PASSWORD_FORM,
    enableReinitialize: true,
})(ChangePasswordForm);

export default Form;
