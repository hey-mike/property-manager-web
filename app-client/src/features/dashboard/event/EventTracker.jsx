import React from 'react';
import PropTypes from 'prop-types';
import { Timeline, Icon, Button } from 'antd';

const EventTracker = props => {
  return (
    <div>
      <Timeline>
        <Timeline.Item key="demo1" color="green">
          Create a services site 2015-09-01
        </Timeline.Item>
        <Timeline.Item
          key="demo2"
          dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}
          color="green">
          Create a services site 2015-09-01
        </Timeline.Item>
        <Timeline.Item key="demo3" color="red">
          <p>Solve initial network problems 1</p>
          <p>Solve initial network problems 2</p>
          <p>Solve initial network problems 3 2015-09-01</p>
        </Timeline.Item>
        <Timeline.Item key="demo4">
          <p>Technical testing 1</p>
          <p>Technical testing 2</p>
          <p>Technical testing 3 2015-09-01</p>
        </Timeline.Item>
      </Timeline>
      <Button type="primary" onClick={this.handleClick}>
        Read More
      </Button>
    </div>
  );
};

EventTracker.propTypes = {
  classes: PropTypes.object,
};

export default EventTracker;
