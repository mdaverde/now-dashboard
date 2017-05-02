import moment from 'moment';
import DeployState from './components/DeployState';

function calendar(created) {
  return moment(created, 'x').calendar(null, {
    sameElse: 'MM/DD/YYYY h:mm a'
  });
}

export default function({ deployment, deleteDeployment }) {
  const { created, state, scale: { current, max }, uid, url } = deployment;
  return (
    <div className="root">
      <style jsx>{`
        .root {
          display: flex;
          // font-family: 'Menlo';
          font-size: 12px;
          margin-bottom: 8px;
        }
        .deploy-property {
          width: 100px;
          margin-right: 16px;
        }
        .uid {
          color: gray;
          width: 220px;
        }
        .url {
          width: 220px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .created {
          width: 175px;
        }
        a {
          color: white;
          text-decoration: none;
        }
        a:hover {
          color: #06b0d7;
          text-decoration: underline;
        }
        .remove-link:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>
      <div className="deploy-property uid">{uid}</div>
      <div className="deploy-property url">
        <a href={`//${url}`}>{url}</a>
      </div>
      <div className="deploy-property created">{calendar(created)}</div>
      <div className="deploy-property scale">{current} / {max} instances</div>
      <div className="deploy-property state">
        <DeployState state={state} />
      </div>
      <div
        className="deploy-property remove-link"
        onClick={() => deleteDeployment(uid)}
      >
        delete
      </div>
    </div>
  );
}
