import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProfileDataForm from '../../components/AccountConfigurations/ProfileDataForm';
import ChangePasswordForm from '../../components/AccountConfigurations/ChangePassword';
import { updateUser, changePassword } from '../../redux/actions/userAction';
import { Link } from 'react-router-dom';

class AccountConfigurations extends React.Component {
    onSubmitBasicDataHandler(data) {
        this.props.updateUser(data);
    }

    onSubmitChangePasswordHandler(data) {
        this.props.changePassword(data);
    }

    render() {
        return (
            <div>
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Minha conta</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                                    <li className="breadcrumb-item">Minha conta</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        Meus dados
                    </div>
                    <div class="card-body">
                        <ProfileDataForm
                            onSubmit={(data) => this.onSubmitBasicDataHandler(data)}
                        />
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        Segurança - Alterar senha
                    </div>
                    <div class="card-body">
                        <ChangePasswordForm
                            onSubmit={(data) => this.onSubmitChangePasswordHandler(data)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({ updateUser, changePassword }, dispatch)
);

export default connect(null, mapDispatchToProps)(AccountConfigurations);