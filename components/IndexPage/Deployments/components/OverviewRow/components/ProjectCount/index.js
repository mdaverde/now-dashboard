import React from 'react';
import _ from 'lodash';

function getProjectCountProps(deployments) {
  const projectCount = (new Set(_.map(deployments, 'name'))).size;
  return { projectCount };
}

export default function({ deployments }) {
  const { projectCount } = getProjectCountProps(deployments);
  return (
    <div className="root">
      <style jsx>{`
        .root {
          height: 100%;
          text-align: center;
        }
        .project-count {
          font-size: 72px;
          padding-top: 30px;
        }
      `}</style>
      <div className="project-count">
        <span>{projectCount}</span>
      </div>
      <div className="instance-text">projects</div>
    </div>
  );
}
