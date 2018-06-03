import React from 'react';
import PropTypes from 'prop-types';
import ExpenseGraph from './charts/ExpenseGraph';

class BudgetSectionContainer extends React.Component {
  render() {
    return <ExpenseGraph />;
  }
}

export default BudgetSectionContainer;
