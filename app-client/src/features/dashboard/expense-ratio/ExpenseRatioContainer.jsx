import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';
import ExpenseRatioChart from './ExpenseRatioChart';
import './ExpenseRatioContainer.css';

class ExpenseRatioContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log('LoginPage', props);
  }

  render() {
    return (
      <div className="expense-ratio-container">
        <ExpenseRatioChart />
      </div>
    );
  }
}
ExpenseRatioContainer.prototypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(ExpenseRatioContainer);
