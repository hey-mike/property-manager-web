import React from 'react';

import LeaseCalendar from './LeaseCalendar.jsx';

class LeaseCalendarPage extends React.Component {
  render() {
    return <LeaseCalendar history={this.props.history} />;
  }
}
export default LeaseCalendarPage;
