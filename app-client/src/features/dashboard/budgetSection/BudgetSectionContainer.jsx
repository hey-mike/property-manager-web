import React from 'react';
import { Tabs } from 'antd';
import ExpenseGraph from './ExpenseGraph';
import DateRangePicker from './DateRangePicker';
import './BudgetSectionContainer.css';
const TabPane = Tabs.TabPane;

class BudgetSectionContainer extends React.Component {
  render() {
    return (
      <Tabs tabBarExtraContent={<DateRangePicker />}>
        <TabPane tab="Income" key="1">
          <ExpenseGraph />
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of tab 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of tab 3
        </TabPane>
      </Tabs>
    );
  }
}

export default BudgetSectionContainer;
