import React from 'react';
import _ from 'lodash';
import InstanceCount from './components/InstanceCount';

function getInstanceCountProps(deployments) {
  return {
    instanceCount: _.sum(_.map(deployments, _.property('scale.current'))),
    instanceMax: _.sum(_.map(deployments, _.property('scale.max'))),
  };
}

export default function({ deployments }) {
  const instanceCountProps = getInstanceCountProps(deployments);
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
          <InstanceCount {...instanceCountProps} />
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
