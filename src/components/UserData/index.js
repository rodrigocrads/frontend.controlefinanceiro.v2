import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getUser } from '../../redux/actions/userAction';

class WelcomeUserData extends Component {
    componentDidMount() {
        this.props.getUser();
    }

    getName() {
        const name = this.props.user?.name;

        if (name && name.split(' ').length > 2) {
            return `${name.split(' ')[0]} ${name.split(' ')[1]}`
        }

        return name;
    }

    render() {
        return (
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="image">
                    <img src="/dist/img/avatar0.png" className="img-circle elevation-2" alt="Imagem do usuário" />
                </div>
                <div className="info">
                    <Link to="/user-account" className="d-block">{ this.getName() }</Link>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({ getUser }, dispatch)
);

const mapStateToProps = (state) => ({
    user: state.user.current,
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeUserData);