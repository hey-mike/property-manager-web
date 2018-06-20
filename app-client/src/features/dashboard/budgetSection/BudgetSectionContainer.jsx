import React from 'react';
import { Tabs, Card } from 'antd';
import IncomeGraph from './IncomeGraph';
import ExpenseGraph from './ExpenseGraph';
import UserActionContainer from './UserActionContainer';
import './BudgetSectionContainer.css';
const TabPane = Tabs.TabPane;

class BudgetSectionContainer extends React.Component {
  state = {
    loading: true,
  };
  componentDidMount() {
    setTimeout(() => {
      this.handleClick();
    }, 1500);
  }
  handleClick = () => {
    this.setState({ loading: !this.state.loading });
  };

  render() {
    return (
      <section className="dashboard-section">
        <Card loading={this.state.loading} title="Budget">
          <Tabs tabBarExtraContent={<UserActionContainer />}>
            <TabPane tab="Overview" key="1" />
            <TabPane tab="Income" key="2">
              <IncomeGraph chartId="income-chart" />
            </TabPane>
            <TabPane tab="Expense" key="3">
              <ExpenseGraph chartId="expense-chart" />
            </TabPane>
          </Tabs>
        </Card>
      </section>
    );
  }
}

export default BudgetSectionContainer;
