import React from 'react';
import { Link } from 'react-router-dom';

import icoDown from '../../img/down.png';
import icoUp from '../../img/up.png';

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = { open: false }
    }

    toggle() {
        this.setState({ open: !this.state.open });
    }

    render() {
        return (
            <li className={`dropdown ${this.state.open ? 'active' : ''}`}>
                <a onClick={() => this.toggle()}>
                    {this.props.name}
                    <img className="ico-dropdown" src={this.state.open ? icoUp : icoDown} alt="" />
                </a>

                <ul className="menu_dropdown">
                    { this.props.links.map(item => <li><Link to={item.path}>{item.name}</Link></li>) }
                </ul>
            </li>
        );
    }
}