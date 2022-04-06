import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BasicDataForm from '../../components/YourData/BasicData';
import ChangePasswordForm from '../../components/YourData/ChangePassword';
import { updateUser, changePassword } from '../../redux/actions/userAction';

class YourData extends React.Component {
    onSubmitBasicDataHandler(data) {
        this.props.updateUser(data);
    }

    onSubmitChangePasswordHandler(data) {
        this.props.changePassword(data);
    }

    render() {
        return (
            <div>
                <div className="header_walk_links">
                    SEUS DADOS
                </div>
                <div className="widget">
                    <div className="widget_header">
                        Dados básicos
                    </div>

                    <div className="widget_content">
                        <BasicDataForm
                            onSubmit={(data) => this.onSubmitBasicDataHandler(data)} />
                    </div>
                </div>

                <div className="widget">
                    <div className="widget_header">
                        Segurança - Alterar senha
                    </div>

                    <div className="widget_content">
                        <ChangePasswordForm
                            onSubmit={(data) => this.onSubmitChangePasswordHandler(data)} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({ updateUser, changePassword }, dispatch)
);

export default connect(null, mapDispatchToProps)(YourData);