import React from 'react';
import { DatePicker } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
const { RangePicker } = DatePicker;

// class DateRangePicker extends React.Component {
//   onChange(dates, dateStrings) {
//     console.log('From: ', dates[0], ', to: ', dates[1]);
//     console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
//   }
//   render() {
//     return (
//       <div>
//         <RangePicker
//           ranges={{
//             Today: [moment(), moment()],
//             'This Month': [moment(), moment().endOf('month')],
//           }}
//           onChange={this.props.selectDate}
//         />
//       </div>
//     );
//   }
// }

const DateRangePicker = props => (
  <div>
    <RangePicker
      ranges={{
        Today: [moment(), moment()],
        'This Month': [moment(), moment().endOf('month')],
      }}
      onChange={props.selectDate}
    />
  </div>
);
DateRangePicker.propTypes = {
  selectDate: PropTypes.func,
};
export default DateRangePicker;
