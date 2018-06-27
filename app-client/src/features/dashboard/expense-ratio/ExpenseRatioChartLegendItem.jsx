import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { List, Avatar } from 'antd';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

class ExpenseRatioChartLegendItem extends React.Component {
  render() {
    return (
      <div>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{item.title}</a>}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}
ExpenseRatioChartLegendItem.prototypes = {
  history: PropTypes.object,
};

export default withRouter(ExpenseRatioChartLegendItem);
