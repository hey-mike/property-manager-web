import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { List, Avatar } from 'antd';

const ExpenseRatioChartLegendItem = props => {
  return (
    <div>
      <li>
        <span className="dot___1P6U0" />
        <span className="legendTitle___2NMB2">家用电器</span>
        <div className="ant-divider ant-divider-vertical" />
        <span className="percent___3jZ38">28.79%</span>
        <span className="value___1Iy0p">
          <span>¥ 4,544</span>
        </span>
      </li>
    </div>
  );
};
ExpenseRatioChartLegendItem.prototypes = {
  title: PropTypes.string.isRequired,
};

export default withRouter(ExpenseRatioChartLegendItem);
