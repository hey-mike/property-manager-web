import React from 'react';
import { Card, Row, Col } from 'antd';
import EditIncomeTable from './EditIncomeTable';
import EditExpenseTable from './EditExpenseTable';
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
          <Card title="Income">
            <EditIncomeTable context={EditableContext} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <Card title="Expense">
            <EditExpenseTable context={EditableContext} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <Card title="Expense">
            <FinanceSummary />
          </Card>
        </Col>
      </Row>
    );
  }
}
export default FinancePage;
