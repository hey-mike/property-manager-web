import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table } from 'antd';
import { fetchEmployees } from '../../../actions/employeeActions';

import './Table.css';

import TableToolbar from './TableToolbar.jsx';
import TableEditBtn from './TableEditBtn.jsx';
import TableDeleteBtn from './TableDeleteBtn.jsx';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: (name, record) => `${name.firstName} ${name.lastName}`,
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
        <TableEditBtn id={record._id} />
        <span className="ant-divider" />
        <TableDeleteBtn id={record._id} />
      </span>
    ),
  },
];

class TenantTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      orderBy: 'created',
      pageSize: 10,
      pageNum: 1,
      pagination: {},
      filteredInfo: null,
      sortedInfo: null,
    };

    this.handleChange = this.handleChange.bind(this);

    this.enterAnim = [
      { opacity: 0, x: 30, backgroundColor: '#fffeee', duration: 0 },
      {
        height: 0,
        duration: 200,
        type: 'from',
        delay: 250,
        ease: 'easeOutQuad',
        onComplete: this.onEnd,
      },
      { opacity: 1, x: 0, duration: 250, ease: 'easeOutQuad' },
      { delay: 1000, backgroundColor: '#fff' },
    ];
    this.leaveAnim = [
      { duration: 250, opacity: 0 },
      { height: 0, duration: 200, ease: 'easeOutQuad' },
    ];
  }
  onEnd(e) {
    const dom = e.target;
    dom.style.height = 'auto';
  }

  componentDidMount() {
    // console.log('componentDidMount');
    this.props.dispatch(
      fetchEmployees(this.props.location, this.state.pageSize)
    );
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('componentDidUpdate');
    if (prevProps.location.search != this.props.location.search) {
      this.props.dispatch(
        fetchEmployees(this.props.location, this.state.pageSize)
      );
    }
  }
  handleChange(pagination, filters, sorter) {
    const { total, current, pageSize } = pagination;

    // this.setState({
    //   filteredInfo: filters,
    //   sortedInfo: sorter,
    // });
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
    const { search } = this.props.location;
    console.log('search', search);
    const query = Object.assign(qs.parse(search), { _page: current });
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: qs.stringify(query),
    });
    // // this.fetch({
    //   results: pagination.pageSize,
    //   page: pagination.current,
    //   sortField: sorter.field,
    //   sortOrder: sorter.order,
    //   ...filters,
    // });
  }
  clearFilters() {
    this.setState({ filteredInfo: null });
  }
  clearAll() {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  }
  setAgeSort() {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  }

  getBodyWrapper(body) {
    // 切换分页去除动画;
    if (this.currentPage !== this.newPage) {
      this.currentPage = this.newPage;
      return body;
    }
    return (
      <TweenOneGroup
        component="tbody"
        className={body.props.className}
        enter={this.enterAnim}
        leave={this.leaveAnim}
        appear={false}>
        {body.props.children}
      </TweenOneGroup>
    );
  }

  render() {
    const { classes, isFetching, employees, totalCount, pageNum } = this.props;
    const { order, orderBy, selected } = this.state;

    return (
      <div>
        <TableToolbar />
        <Table
          columns={columns}
          loading={isFetching}
          rowKey={record => record._id}
          dataSource={employees}
          pagination={{ total: totalCount, current: pageNum }}
          onChange={this.handleChange}
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
    pageSize,
    pageNum,
    offset,
  } = state.employeeState;

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

export default withRouter(connect(mapStateToProps)(EmployeeTable));
