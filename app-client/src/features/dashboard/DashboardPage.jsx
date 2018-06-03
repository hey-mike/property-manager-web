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
          <Col span={8}>
            <Card title="Total Employee">Card content</Card>
          </Col>
          <Col span={8}>
            <Card title="Leave Requests">Card content</Card>
          </Col>
          <Col span={8}>
            <Card title="On Leave">Card content</Card>
          </Col>
        </Row>

        <Card>
          <BudgetSectionContainer />
        </Card>
      </div>
    );
  }
}
DashboardPage.prototypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(DashboardPage);
