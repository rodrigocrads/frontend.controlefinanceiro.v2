import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from '../../redux/actions/userAction';

class WelcomeUserData extends Component {
    componentDidMount() {
        this.props.getUser();
    }

    getFirstName() {
        const name = this.props.user?.name;
        if (name) return name.split(' ')[0];
    }

    render() {
        return (
            <div className="only-mobile" style={{ height: '45px', backgroundColor: '#ededed', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
                <p style={{ margin: '10px 10px 0 10px'}}><b>Olá, { this.getFirstName() }</b></p>
                <small style={{ margin: '0'}}>{this.props.user?.email}</small>
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