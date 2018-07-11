import React from 'react';
import { Card, Row, Col } from 'antd';
import EditIncomeTable from './EditIncomeTable';
import EditExpenseTable from './EditExpenseTable';

const EditableContext = React.createContext();
class FinancePage extends React.Component {
  callback(key) {
    console.log(key);
  }
  render() {
    return (
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Card title="Income">
            <EditIncomeTable context={EditableContext} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Card title="Expense">
            <EditExpenseTable context={EditableContext} />
          </Card>
        </Col>
      </Row>
    );
  }
}
export default FinancePage;
