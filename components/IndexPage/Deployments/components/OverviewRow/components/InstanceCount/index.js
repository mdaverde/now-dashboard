import React from 'react';
import _ from 'lodash';

function getInstanceCountProps(deployments) {
  return {
    instanceCount: _.sum(_.map(deployments, _.property('scale.current'))),
    instanceMax: _.sum(_.map(deployments, _.property('scale.max'))),
  };
}

export default function({ deployments }) {
  const { instanceCount, instanceMax } = getInstanceCountProps(deployments);
  return (
    <div className="root">
      <style jsx>{`
        .root {
          height: 100%;
          text-align: center;
        }
        .instance-count {
          font-size: 72px;
          padding-top: 30px;
        }
        .instance-max {
          font-size: 24px;
          color: gray;
        }
      `}</style>
      <div className="instance-count">
        <span>{instanceCount}</span>
        <span className="instance-max">/{instanceMax}</span>
      </div>
      <div className="instance-text">instances running</div>
    </div>
  );
}
