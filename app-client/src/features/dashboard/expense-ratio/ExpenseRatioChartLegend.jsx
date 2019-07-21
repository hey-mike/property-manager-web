import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ExpenseRatioChartLegendItem from './ExpenseRatioChartLegendItem';

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
