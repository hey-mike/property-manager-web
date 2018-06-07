import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table } from 'antd';
import TableEditBtn from './TableEditBtn.jsx';
import TableDeleteBtn from './TableDeleteBtn.jsx';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: (name, record) => `${name.first} ${name.last}`,
    width: 150,
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
    width: 150,
  },
  {
    title: 'Department',
    dataIndex: 'department',
  },
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'CreatedAt',
    render: createdAt => new Date(createdAt).toDateString(),
    dataIndex: 'createdAt',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <TableEditBtn id={record.key} />
        <span className="ant-divider" />
        <TableDeleteBtn id={record.key} />
      </span>
    ),
  },
];

class TenantTable extends Component {
  state = {
    data: [],
    pagination: {},
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
  fetch = (params = {}) => {
    console.log('params:', params);
    this.setState({ loading: true });
    axios({
      url: 'https://randomuser.me/api',
      method: 'get',
      data: {
        results: 10,
        ...params,
      },
      type: 'json',
    }).then(res => {
      const { data } = res;
      console.log('res', res);
      console.log(data);
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = 200;
      this.setState({
        loading: false,
        data: data.results,
        pagination,
      });
    });
  };
  componentDidMount() {
    this.fetch();
  }
  render() {
    return (
      <div>
        <Table
          columns={columns}
          rowKey={record => record.registered}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}
TenantTable.defaultProps = {
  className: 'table-enter-leave-demo',
};
TenantTable.propTypes = {
  location: PropTypes.object.isRequired,
  employees: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = (state, ownProps) => {
  const {
    employees,
    totalCount,
    isFetching,
    lastUpdated,
    deletedEmployees,
    pageNum,
    offset,
  } = state.tenant;

  return {
    employees: employees,
    totalCount: totalCount,
    isFetching: isFetching,
    lastUpdated: lastUpdated,
    deletedEmployees: deletedEmployees,
    pageNum: pageNum,
    offset: offset,
  };
};

export default withRouter(connect(mapStateToProps)(TenantTable));
