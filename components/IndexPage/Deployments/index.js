// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import DeploymentGroup from './components/DeploymentGroup';

export default class extends Component {
  render() {
    const { deployments } = this.props;
    const groupedDeployments = _.groupBy(deployments, 'name');
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
}
