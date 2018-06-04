import React from 'react';
import { Button } from 'antd';
import DateRangePicker from './DateRangePicker';

class UserActionContainer extends React.Component {
  render() {
    return (
      <div>
        {/* <a>Default</a>
        <a>Default</a>
        <a>Default</a> */}
        <DateRangePicker />
      </div>
    );
  }
}
export default UserActionContainer;
