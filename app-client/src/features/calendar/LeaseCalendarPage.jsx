import React from 'react';
import { Card } from 'antd';
import LeaseCalendar from './LeaseCalendar.jsx';

class LeaseCalendarPage extends React.Component {
  render() {
    return (
      <Card>
        <LeaseCalendar history={this.props.history} />
      </Card>
    );
  }
}
export default LeaseCalendarPage;
