import React from 'react';
import InstanceCount from './components/InstanceCount';
import RateOfDeployment from './components/RateOfDeployment';

export default function({ deployments }) {
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
          <RateOfDeployment deployments={deployments} />
        </div>
        <div className="box">
          <InstanceCount deployments={deployments} />
        </div>
        <div className="box">
          <InstanceCount deployments={deployments} />
        </div>
      </div>
    </div>
  );
}
