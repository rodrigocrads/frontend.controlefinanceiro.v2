import React, { Component } from 'react';
import CategoryList from '../../components/Category/List';
import icoList from '../../img/ico-list.png';

export default class List extends Component {
    render() {
        return (
            <div>
                <div className="header_walk_links">
                    CATEGORIAS / LISTAR
                </div>
                <div className="widget">
                    <div className="widget_header">
                        <img src={icoList} className="ico" alt="" />
                        Categorias
                    </div>

                    <div className="widget_content">
                        <div className="table_area">
                            <CategoryList />
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}