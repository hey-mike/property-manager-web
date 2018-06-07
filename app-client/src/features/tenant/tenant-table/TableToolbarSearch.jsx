import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import { Select, Spin, Icon } from 'antd';
// import Auth from '../../../store/auth';
import debounce from 'lodash.debounce';
const Option = Select.Option;

function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}

function searchResult(query) {
  return new Array(getRandomInt(5))
    .join('.')
    .split('.')
    .map((item, idx) => ({
      query,
      category: `${query}${idx}`,
      count: getRandomInt(200, 100),
    }));
}

let lastFetchId = 0;
class TableToolbarSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      value: [],
      fetching: false,
    };

    // this.fetchUser = debounce(this.fetchUser, 500);

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.findEmployee = this.findEmployee.bind(this);
  }

  handleSearch(value) {
    this.setState({
      data: value ? this.fetchUser(value) : [],
    });
  }
  handleChange(value, option) {
    console.log('handleChange', value);
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  }

  findEmployee() {
    if (!this.state.fetching) {
      const { search } = this.props.location;
      const query = Object.assign(qs.parse(search), {
        search: this.state.value,
      });
      this.props.history.push({
        pathname: this.props.location.pathname,
        search: qs.stringify(query),
      });
    }
  }
  render() {
    const { fetching, data, value } = this.state;

    return (
      <span>
        <Select
          mode="multiple"
          labelInValue
          value={value}
          placeholder="Select users"
          notFoundContent={fetching ? <Spin size="small" /> : null}
          filterOption={false}
          onChange={this.handleChange}
          style={{ width: '100%' }}>
          {data.map(d => <Option key={d.value}>{d.text}</Option>)}
        </Select>
        <Icon type="search" />
      </span>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const employeeState = state.employeeState;
  return {
    employees: employeeState.employees,
    totalCount: employeeState.totalCount,
    isFetching: employeeState.isFetching,
    lastUpdated: employeeState.lastUpdated,
    updatedEmployee: employeeState.updatedIssue,
  };
};

export default withRouter(connect()(TableToolbarSearch));
