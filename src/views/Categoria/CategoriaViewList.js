import React, { Component } from 'react';

import icoMenuEdit from '../../img/edit.png';

export default class CategoriaViewList extends Component {
    render() {
        return (
            <div>
            <div className="header_walk_links">
                CATEGORIA -> LISTAR
            </div>
            <div className="widget">
                <div className="widget_header">
                    <img src={icoMenuEdit} className="ico" alt="" />
                    Categorias
                </div>
                <div className="widget_content"></div>
            </div>
        </div>
        );
    };
}