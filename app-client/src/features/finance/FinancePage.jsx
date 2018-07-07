import React from 'react';
import { Card, Row, Col } from 'antd';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

class FinancePage extends React.Component {
  render() {
    return (
      <div className="card-container">
        <Tabs type="card">
          <TabPane tab="Tab Title 1" key="1">
            <p>Content of Tab Pane 1</p>
            <p>Content of Tab Pane 1</p>
            <p>Content of Tab Pane 1</p>
          </TabPane>
          <TabPane tab="Tab Title 2" key="2">
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
          </TabPane>
          <TabPane tab="Tab Title 3" key="3">
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
export default FinancePage;
