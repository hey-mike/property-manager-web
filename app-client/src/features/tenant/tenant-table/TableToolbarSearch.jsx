import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { Select, Spin, Icon, Button, Input, AutoComplete } from 'antd';
import debounce from 'lodash.debounce';
const Option = Select.Option;
import Highlighter from 'react-highlight-words';
import Auth from '../../../store/auth';

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

function renderOption(item) {
  return (
    <Option key={item.id} text={item.text} value={item.text}>
      <Highlighter
        highlightClassName="highlight"
        searchWords={[item.search]}
        textToHighlight={item.text}
      />
    </Option>
  );
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

    this.fetchUser = debounce(this.fetchUser, 500);

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.findEmployee = this.findEmployee.bind(this);
  }

  requestHeaders() {
    const jwt = Auth.getToken();
    return { AUTHORIZATION: `Bearer ${jwt}` };
  }
  fetchUser(value) {
    console.log('fetching user', value);
    lastFetchId += 1;
    const fetchId = lastFetchId;
    this.setState({ fetching: true });

    const headers = Object.assign(
      {
        'Content-Type': 'application/json',
      },
      this.requestHeaders()
    );
    const request = new Request(`/api/employee/?_limit=5&search=${value}`, {
      method: 'GET',
      headers: headers,
    });

    fetch(request)
      .then(response => response.json())
      .then(body => {
        // if (fetchId !== lastFetchId) { // for fetch callback order
        //   return;
        // }
        const data = body.records.map(user => ({
          // id: user._id,
          // search: value,
          value: user._id,
          text: `${user.name.firstName} ${user.name.lastName}`,
          fetching: false,
        }));
        console.log('data', data);
        this.setState({ data });
      });
  }
  handleSearch(value) {
    this.setState({
      data: value ? fetchUser(value) : [],
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
          onSearch={this.fetchUser.bind(this)}
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

export default withRouter(connect(mapStateToProps)(TableToolbarSearch));
