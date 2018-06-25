import React from 'react';
import { Tabs, Card } from 'antd';
import IncomeGraph from './IncomeGraph';
import ExpenseGraph from './ExpenseGraph';
import DateRangePicker from './DateRangePicker';
import './BudgetSectionContainer.css';
const TabPane = Tabs.TabPane;

class BudgetSectionContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.handleClick();
    }, 1500);
  }
  handleClick = () => {
    this.setState({ loading: !this.state.loading });
  };
  selectDate(dates, dateStrings) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  }
  render() {
    return (
      <section className="dashboard-section">
        <Card loading={this.state.loading} title="Budget">
          <Tabs
            tabBarExtraContent={
              <DateRangePicker selectDate={this.selectDate} />
            }>
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
