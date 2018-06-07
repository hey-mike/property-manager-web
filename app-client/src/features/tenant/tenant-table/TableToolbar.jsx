import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Button } from 'antd';

import TableToolbarAdd from "./TableToolbarAdd.jsx";
import TableToolbarSearch from "./TableToolbarSearch.jsx";


export default class TableToolbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="table-header">
                <div className={classnames("table-header-item", "search-bar")}>
                    <TableToolbarSearch />
                </div>
                <div className={classnames("table-header-item", "table-header-menu" )}>
                    <TableToolbarAdd />
                </div>

            </div >
        );
    }
}
TableToolbar.propTypes = {
};
