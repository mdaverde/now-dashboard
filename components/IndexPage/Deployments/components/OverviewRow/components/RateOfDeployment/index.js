import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import fontFamily from '../../../../../../../css/fontFamily';

if (typeof window !== 'undefined') {
  const Chart = require('chart.js');
  _.merge(Chart.defaults.global, {
    defaultFontFamily: fontFamily,
    defaultFontColor: '#fff',
  });
}

function generateChartData(dailyCounts) {
  return {
    labels: _.keys(dailyCounts),
    datasets: [
      {
        label: 'Deployments',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'white',
        borderColor: 'white',
        borderCapStyle: 'round',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'round',
        borderWidth: 2,
        pointBorderColor: 'white',
        pointBackgroundColor: 'white',
        pointBorderWidth: 1,
        pointHoverRadius: 3,
        pointHoverBackgroundColor: 'black',
        pointHoverBorderColor: 'white',
        pointHoverBorderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 10,
        data: _.values(dailyCounts),
        spanGaps: false,
      }
    ]
  };
}

function getRateOfDeploymentProps(deployments) {
  const dayFormat = 'M/DD/YY';
  const today = moment();
  today.add(1, 'day');
  const dailyCounts = _(_.range(7))
    .map(() => {
      today.subtract(1, 'day');
      return [today.format(dayFormat), 0];
    })
    .reverse()
    .fromPairs()
    .value();
  const lastWeekDays = _.keys(dailyCounts);
  _.forEach(deployments, ({ created }) => {
    const dayOfDeployment = moment(created, 'x').format(dayFormat);
    if (_.includes(lastWeekDays, dayOfDeployment)) {
      dailyCounts[dayOfDeployment]++;
    }
  });
  return { dailyCounts };
}

export default class extends Component {
  componentDidMount() {
    if (window) {
      const { dailyCounts } = getRateOfDeploymentProps(this.props.deployments);
      const ctx = this.chart.getContext('2d');
      new Chart(ctx, {
        data: generateChartData(dailyCounts),
        type: 'line',
        options: {
          title: {
            text: 'Rate of deployment',
            display: true,
            fontStyle: 'normal',
            fontSize: 14,
          },
          legend: { display: false },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                callback: (value) => Number.isInteger(value) ? value : null
              }
            }]
          }
        }
      });
    }
  }
  render() {
    return (
      <div className='root'>
        <style jsx>{`
          .root {
          }
          .line-chart {
            margin: 0;
          }
        `}</style>
        <canvas
          className='line-chart'
          ref={(chart) => this.chart = chart}
          width='200'
          height='200'
        />
      </div>
    );
  }
}
