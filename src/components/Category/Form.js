import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import Input from '../reduxFormsUI/Input';
import Select from '../reduxFormsUI/Select';
import { fetchCategory } from '../../redux/actions/categoryAction';

class FormBase extends Component {
    constructor(props) {
        super(props);

        if (!!this.props.id) {
            this.props.fetchCategory(this.props.id);
        }
    }

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
                        label='Nome:'
                        maxLength='100'
                        required
                    />

                    <Field
                        name="type"
                        component={Select}
                        label="Tipo:"
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

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        fetchCategory,
    }, dispatch)
);

const mapStateToProps = state => ({
    initialValues: state.category,
});

const Form = reduxForm({
    form: 'categoryForm',
    enableReinitialize: true
})(FormBase);

export default connect(mapStateToProps, mapDispatchToProps)(Form);
