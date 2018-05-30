import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    console.log('LoginPage', props);
  }

  render() {
    return <div className={classnames('wrapper')}>dashboard page</div>;
  }
}
DashboardPage.prototypes = {
  history: PropTypes.object.isRequired,
};

export default connect()(DashboardPage);
