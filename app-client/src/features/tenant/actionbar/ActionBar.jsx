import React from 'react';
import { Row, Col } from 'antd';
import './ActionBar.css';
import Search from './Search';
import AddButton from './AddButton';

let ActionBar = () => {
  return (
    <Row className="action-bar" type="flex" justify="space-between">
      <Col span={6}>
        <Search />
      </Col>
      <Col span={6}>
        <AddButton />
      </Col>
    </Row>
  );
};
export default ActionBar;
