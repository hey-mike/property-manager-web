import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';
import EventContainer from './event/EventContainer';
import BudgetContainer from './budget/BudgetContainer';
import ExpenseRatioContainer from './expense-ratio/ExpenseRatioContainer';
import './DashboardPage.css';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    console.log('LoginPage', props);
  }

  render() {
    return (
      <div className="dashboard-page">
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

        <section className="info-section">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={12} xl={6}>
              <Card title="Notices">
                <EventContainer />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={18}>
              <Card title="Expense Breakdown">
                <ExpenseRatioContainer />
              </Card>
            </Col>
          </Row>
        </section>

        <section className="dashboard-section">
          <BudgetContainer />
        </section>
      </div>
    );
  }
}
DashboardPage.prototypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(DashboardPage);
