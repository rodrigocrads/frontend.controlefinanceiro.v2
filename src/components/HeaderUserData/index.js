import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { getUser } from '../../redux/actions/userAction';

class MenuMobileControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUserAreaMenu: false,
        }
        this.componentRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        this.props.getUser();
        document.addEventListener("click", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (!this?.state?.showUserAreaMenu) return;

        if (this.componentRef && !this.componentRef.current.contains(event.target)) {
            this.togglShowUserAreaMenu();
        }
    }

    togglShowUserAreaMenu() {
        this.setState({
            showUserAreaMenu: !this.state.showUserAreaMenu
        });
    }

    getNamePartsInitialLetters() {
        if (!this.props.user.name) {
            return '';
        }
        const nameParts = this.props.user?.name.split(" ");

        if (nameParts.length === 1) {
            return `${nameParts[0].charAt(0)}`;
        }

        return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`;
    }

    getName() {
        if (!this.props.user.name) {
            return '';
        }
        const nameParts = this.props.user?.name.split(" ");

        if (nameParts.length === 1) {
            return `${this.formatNamePart(nameParts[0])}`;
        }

        return `${this.formatNamePart(nameParts[0])} ${this.formatNamePart(nameParts[1])}`;
    }

    formatNamePart(part) {
        return `${part.charAt(0).toUpperCase()}${part.slice(1).toLowerCase()}`;
    }

    render() {
        return (
            <div ref={this.componentRef} className="user-area">
                <div className="user-area__identifier"
                    onClick={() => this.togglShowUserAreaMenu()}
                >
                    { this.getNamePartsInitialLetters() }
                </div>
                {
                    this.state.showUserAreaMenu &&
                        <div className="user-area__menu">
                            <div className="user_area__menu-user-data">
                                <p><b>{this.getName()}</b></p>
                                <p>{this.props.user?.email}</p>
                            </div>
                            <ul className="user-area__menu-itens--list-style">
                                <li><Link className="user-area__menu-item" to="/accountConfigurations">Configurações</Link></li>
                                <li><Link className="user-area__menu-item" to="/logouts">Logout</Link></li>
                            </ul>
                        </div>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuMobileControl);