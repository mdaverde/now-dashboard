import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import InstanceCount from './components/InstanceCount';
import RateOfDeployment from './components/RateOfDeployment';

function getInstanceCountProps(deployments) {
  return {
    instanceCount: _.sum(_.map(deployments, _.property('scale.current'))),
    instanceMax: _.sum(_.map(deployments, _.property('scale.max'))),
  };
}

function getRateOfDeploymentProps(deployments) {
  const dayFormat = 'M/DD/YY';
  const today = moment();
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

export default function({ deployments }) {
  const instanceCountProps = getInstanceCountProps(deployments);
  const rateOfDeploymentProps = getRateOfDeploymentProps(deployments);
  return (
    <div className="root">
      <style jsx>{`
        .overview-row-x {
          display: flex;
          justify-content: space-between;
          width: 650px;
          margin-left: auto;
          margin-right: auto;
        }
        .box {
          height: 200px;
          width: 200px;
        }
      `}</style>
      <div className="overview-row-x">
        <div className="box">
          <RateOfDeployment {...rateOfDeploymentProps} />
        </div>
        <div className="box">
          <InstanceCount {...instanceCountProps} />
        </div>
        <div className="box">
          <InstanceCount {...instanceCountProps} />
        </div>
      </div>
    </div>
  );
}
