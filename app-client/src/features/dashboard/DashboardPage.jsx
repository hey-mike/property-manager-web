import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';
import BudgetSectionContainer from './budgetSection/BudgetSectionContainer';
import './DashboardPage.css';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    console.log('LoginPage', props);
  }

  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={12} xl={6}>
            <Card title="Total Income">Card content</Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6}>
            <Card title="Total Expense">Card content</Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6}>
            <Card title="Total tenants">Card content</Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6}>
            <Card title="Total vancies">Card content</Card>
          </Col>
        </Row>

        <BudgetSectionContainer />
      </div>
    );
  }
}
DashboardPage.prototypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(DashboardPage);
