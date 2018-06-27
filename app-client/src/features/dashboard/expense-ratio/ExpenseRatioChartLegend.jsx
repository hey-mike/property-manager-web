import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { List, Avatar } from 'antd';
import ExpenseRatioChartLegendItem from './ExpenseRatioChartLegendItem';

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

class ExpenseRatioChartLegend extends React.Component {
  render() {
    return (
      <div>
        <ExpenseRatioChartLegendItem />
      </div>
    );
  }
}
ExpenseRatioChartLegend.prototypes = {
  history: PropTypes.object,
};

export default withRouter(ExpenseRatioChartLegend);
