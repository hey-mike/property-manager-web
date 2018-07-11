import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';
import ExpenseRatioChart from './ExpenseRatioChart';
import ExpenseRatioChartLegend from './ExpenseRatioChartLegend';
import './ExpenseRatioContainer.css';

class ExpenseRatioContainer extends React.Component {
  render() {
    return (
      <div className="expense-ratio-container">
        <Row>
          <Col xs={24} sm={24} md={24} lg={18} xl={12}>
            <ExpenseRatioChart />
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={12}>
            <ExpenseRatioChartLegend />
          </Col>
        </Row>
      </div>
    );
  }
}
ExpenseRatioContainer.prototypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(ExpenseRatioContainer);
