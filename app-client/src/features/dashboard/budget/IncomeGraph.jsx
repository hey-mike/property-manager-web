import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';

class IncomeGraph extends React.Component {
  render() {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Leaves',
          backgroundColor: 'rgba(33,150,243,0.2)',
          borderColor: 'rgba(33,150,243,0.2)',
          data: [0, 10, 5, 2, 20, 30, 45],
          borderWidth: 1,
        },
      ],
    };
    const option = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      legend: {
        display: true,
        labels: {
          fontColor: 'rgb(255, 99, 132)',
        },
      },
    };

    return (
      <div className="graph-container">
        <Bar data={data} option={option} />
      </div>
    );
  }
}

IncomeGraph.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  chartId: PropTypes.string,
};

export default IncomeGraph;
