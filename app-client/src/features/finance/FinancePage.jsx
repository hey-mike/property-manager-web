import React from 'react';
import { Card, Row, Col, Divider } from 'antd';
import IncomeList from './IncomeList';
import ExpenseList from './ExpenseList';
import FinanceSummary from './FinanceSummary';

class FinancePage extends React.Component {
  callback(key) {
    console.log(key);
  }
  render() {
    return (
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <Card title="Summary">
            <FinanceSummary />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <Card
            title="Income"
            extra={
              <span>
                <a href={null}>Add</a>
                <Divider type="vertical" />
                <a href={null}>Edit</a>
              </span>
            }>
            <IncomeList />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <Card
            title="Expense"
            extra={
              <span>
                <a href={null}>Add</a>
                <Divider type="vertical" />
                <a href={null}>Edit</a>
              </span>
            }>
            <ExpenseList />
          </Card>
        </Col>
      </Row>
    );
  }
}
export default FinancePage;
