import React from 'react';
import DeployRow from './components/DeployRow';

export default function({ deployment, deleteDeployment }) {
  return (
    <div className="root">
      <style jsx>{`
          .root {
            font-size: 12px;
            margin-bottom: 8px;
          }
        `}</style>
      <DeployRow
        deployment={deployment}
        deleteDeployment={deleteDeployment}
      />
    </div>
  );
}
