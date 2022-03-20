import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import Input from '../reduxFormsUI/Input';
import { getUser } from '../../redux/actions/userAction';

class BasicDataForm extends Component {
    componentDidMount() {
        this.props.getUser();
    }

    render() {
        return (
            <>
                <form onSubmit={this.props.handleSubmit}>
                    <Field
                        name='name'
                        component={Input}
                        label='Nome:'
                        maxLength='100'
                        required
                    />

                    <Field
                        name='email'
                        component={Input}
                        label='Email:'
                        maxLength='100'
                        required
                        disabled
                    />

                    <div className="form-actions">
                        <div className="form-action">
                            <input type="submit" className="btn" value="Atualizar dados" />
                        </div>
                    </div>
                </form>
            </>
        );
    };
};

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        getUser,
    }, dispatch)
);

const mapStateToProps = state => ({
    initialValues: state.user.current,
});

const Form = reduxForm({
    form: 'basicDataForm',
    enableReinitialize: true
})(BasicDataForm);

export default connect(mapStateToProps, mapDispatchToProps)(Form);
