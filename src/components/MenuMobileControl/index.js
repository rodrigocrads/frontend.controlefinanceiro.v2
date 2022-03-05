import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { togglSidebarShow } from '../../redux/actions/sidebarAction';

import icoList from '../../img/ico-list.png';

class MenuMobileControl extends Component {
    togglSidebarShow() {
        this.props.togglSidebarShow(
            !this.props.sidebarIsActive
        );
    }

    render() {
        return (
            <div id="ico_menu_mobile">
                <a
                    href="#"
                    id="link_menu_mobile"
                    onClick={() => this.togglSidebarShow()}
                >
                    <img src={icoList} alt="Profile" />
                </a>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({ togglSidebarShow }, dispatch)
);

const mapStateToProps = (state) => ({
    sidebarIsActive: state.sidebar.isActive,
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuMobileControl);