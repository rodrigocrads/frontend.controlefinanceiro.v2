import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import formTypes from '../../redux/formTypes';
import Input from '../reduxFormsUI/Input';

class ChangePasswordForm extends Component {
    render() {
        return (
            <>
                <form onSubmit={this.props.handleSubmit}>
                    <div className='row'>
                        <div className='col-md-4'>
                            <Field
                                type="password"
                                name='old_password'
                                component={Input}
                                label='Senha atual'
                                placeholder='Informe a senha atual'
                                maxLength='50'
                                required
                            />
                        </div>

                        <div className='col-md-4'>
                            <Field
                                type="password"
                                name='new_password'
                                component={Input}
                                label='Nova senha'
                                placeholder='Informe a nova senha'
                                maxLength='50'
                                required
                            />
                        </div>

                        <div className='col-md-2'>
                            <button type="submit" className="btn btn-primary btn-lg mt-4">Salvar</button>
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
    validate: () => {},
})(ChangePasswordForm);

export default Form;
