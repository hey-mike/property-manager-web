import React from 'react';
import { Card, Row, Col } from 'antd';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

class FinancePage extends React.Component {
  callback(key) {
    console.log(key);
  }
  render() {
    return (
      <Tabs defaultActiveKey="1" onChange={this.callback}>
        <TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    );
  }
}
export default FinancePage;
