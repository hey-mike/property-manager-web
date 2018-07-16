import React from 'react';
import { Card, Row, Col } from 'antd';
import IncomeList from './IncomeList';
import ExpenseList from './ExpenseList';
import FinanceSummary from './FinanceSummary';

const EditableContext = React.createContext();
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
          <Card title="Income">
            <IncomeList context={EditableContext} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <Card title="Expense">
            <ExpenseList context={EditableContext} />
          </Card>
        </Col>
      </Row>
    );
  }
}
export default FinancePage;
