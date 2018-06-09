import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table, Divider } from 'antd';
import TableEditBtn from './TableEditBtn.jsx';
import TableDeleteBtn from './TableDeleteBtn.jsx';

import { searchTenants } from '../actions/tenantActions';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: (name, record) => `${name.firstName} ${name.lastName}`,
    width: 150,
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'CreatedAt',
    render: createdAt => moment(createdAt).format('DD-MM-YYYY'),
    dataIndex: 'registered',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => {
      return (
        <span>
          <TableEditBtn id={record._id} />
          <Divider type="vertical" />
          <TableDeleteBtn id={record._id} />
        </span>
      );
    },
  },
];

class TenantTable extends Component {
  state = {
    data: [],
    pagination: { current: 1 },
    loading: false,
  };
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  };
  componentDidMount() {
    this.props.dispatch(searchTenants());
  }
  render() {
    const { tenants, isFetching, total } = this.props;
    return (
      <div>
        <Table
          columns={columns}
          rowKey={record => record._id}
          dataSource={tenants}
          pagination={{ current: this.state.pagination.current, total: total }}
          loading={isFetching}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

TenantTable.propTypes = {
  location: PropTypes.object.isRequired,
  tenants: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
};
const mapStateToProps = (state, ownProps) => {
  const {
    tenants,
    total,
    isFetching,
    lastUpdated,
    deletedTenants,
    pageNum,
    offset,
  } = state.tenant;

  return {
    tenants: tenants,
    total: total,
    isFetching: isFetching,
    lastUpdated: lastUpdated,
    deletedTenants: deletedTenants,
    pageNum: pageNum,
    offset: offset,
  };
};

export default withRouter(connect(mapStateToProps)(TenantTable));
