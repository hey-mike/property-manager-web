import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table, Divider } from 'antd';
import TableEditBtn from './TableEditBtn.jsx';
import TableDeleteBtn from './TableDeleteBtn.jsx';

import { searchTenants } from '../actions';

const columns = [
  {
    title: 'Name',
    dataIndex: 'firstName',
    sorter: true,
    render: (firstName, record) => {
      console.log('firstName', firstName);
      return firstName;
    },
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
  handleTableChange = (pagination, filters, sorter) => {
    const orderMap = { descend: 'desc', ascend: 'asc' };
    sorter.order = sorter.order ? orderMap[sorter.order] : {};

    this.props.dispatch(searchTenants({ pagination, sorter }));
  };
  componentDidMount() {
    console.log('this.props.pagination', this.props.pagination);
    this.props.dispatch(searchTenants({ pagination: this.props.pagination }));
  }
  render() {
    const { tenants, isFetching, pagination } = this.props;
    return (
      <div>
        <Table
          columns={columns}
          rowKey={record => record._id}
          dataSource={tenants}
          pagination={pagination}
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
  pagination: PropTypes.object.isRequired,
};
const mapStateToProps = (state, ownProps) => {
  const {
    tenants,
    isFetching,
    lastUpdated,
    deletedTenants,
    pagination,
  } = state.tenant;

  return {
    tenants: tenants,
    isFetching: isFetching,
    lastUpdated: lastUpdated,
    deletedTenants: deletedTenants,
    pagination: pagination,
  };
};

export default withRouter(connect(mapStateToProps)(TenantTable));
