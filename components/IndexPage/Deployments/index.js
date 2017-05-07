import React from 'react';
import _ from 'lodash';
import DeploymentGroup from './components/DeploymentGroup';
import OverviewRow from './components/OverviewRow';

function groupDeployments(deployments) {
  return _.mapValues(
    _(deployments).sortBy('name').groupBy('name').value(),
    (group) => _(group).sortBy('created').reverse().value()
  )
}

export default function ({ deployments, deleteDeployment }) {
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
      <div className="overview-row">
        <OverviewRow deployments={deployments} />
      </div>
      <div>
        {
          _.map(groupedDeployments, (deployments, name) => (
            <DeploymentGroup
              key={name}
              name={name}
              deployments={deployments}
              deleteDeployment={deleteDeployment}
            />
          ))
        }
      </div>
    </div>
  )
}
