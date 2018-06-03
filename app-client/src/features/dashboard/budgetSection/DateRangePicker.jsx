import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;

class DateRangePicker extends React.Component {
  onChange(dates, dateStrings) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  }
  render() {
    return (
      <div>
        <RangePicker
          ranges={{
            Today: [moment(), moment()],
            'This Month': [moment(), moment().endOf('month')],
          }}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
export default DateRangePicker;
