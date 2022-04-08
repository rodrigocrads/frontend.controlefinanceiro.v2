import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProfileDataForm from '../../components/AccountConfigurations/ProfileDataForm';
import ChangePasswordForm from '../../components/AccountConfigurations/ChangePassword';
import { updateUser, changePassword } from '../../redux/actions/userAction';
import keyIco from '../../img/key.png';
import userIco from '../../img/user.png';

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
                <div className="header_walk_links">
                    CONFIGURAÇÕES
                </div>
                <div className="widget">
                    <div className="widget_header">
                        <img className="ico" src={userIco} alt="Icone usuário" />
                        Perfil - Meus dados
                    </div>

                    <div className="widget_content">
                        <ProfileDataForm
                            onSubmit={(data) => this.onSubmitBasicDataHandler(data)} />
                    </div>
                </div>

                <div className="widget">
                    <div className="widget_header">
                        <img className="ico" src={keyIco} alt="Icone cadeado" />
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

export default connect(null, mapDispatchToProps)(AccountConfigurations);