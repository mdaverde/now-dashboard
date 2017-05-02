import _ from 'lodash';
import DeployItem from './components/DeployItem';

export default function({ name, deployments }) {
  return (
    <div className="root">
      <style jsx>{`
        .root {
          margin-bottom: 32px;
        }
        .name {
          font-size: 21px;
          margin-bottom: 16px;
        }
      `}</style>
      <div className="name">{name}</div>
      <div>
        {
          _.map(deployments, (deployment) => (
            <DeployItem
              key={deployment.uid}
              deployment={deployment}
            />
          ))
        }
      </div>
    </div>
  );
}
