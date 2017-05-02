// @flow
import React from 'react';
import _ from 'lodash';
import DeploymentGroup from './components/DeploymentGroup';

function groupDeployments(deployments) {
  return _.mapValues(
    _.groupBy(deployments, 'name'),
    (group) => _(group).sortBy('created').reverse().value()
  )
}

export default function ({ deployments }) {
  const groupedDeployments = groupDeployments(deployments);
  return (
    <div className="root">
      <style jsx>{`
        h1 {
          font-size: 28px;
          font-weight: normal;
          margin-bottom: 16px;
        }
      `}</style>
      <h1>Deployments</h1>
      <div>
        {
          _.map(groupedDeployments, (deployments, name) => (
            <DeploymentGroup
              key={name}
              name={name}
              deployments={deployments}
            />
          ))
        }
      </div>
    </div>
  )
}
