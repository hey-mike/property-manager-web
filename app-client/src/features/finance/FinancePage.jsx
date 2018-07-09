import React from 'react';
import { Card } from 'antd';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

class FinancePage extends React.Component {
  callback(key) {
    console.log(key);
  }
  render() {
    return (
      <Card>
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="Mortgage" key="mortgage">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Income" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Expense" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </Card>
    );
  }
}
export default FinancePage;
