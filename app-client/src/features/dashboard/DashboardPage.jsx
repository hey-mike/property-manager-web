import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './DashboardPage.css';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    console.log('LoginPage', props);
  }

  render() {
    return <div>dashboar</div>;
  }
}
DashboardPage.prototypes = {
  history: PropTypes.object.isRequired,
};

export default connect()(DashboardPage);
