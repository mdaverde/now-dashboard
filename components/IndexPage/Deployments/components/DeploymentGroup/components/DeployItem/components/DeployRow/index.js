import moment from 'moment';
import DeployState from './components/DeployState';

function calendar(created) {
  return moment(created, 'x').calendar(null, {
    sameElse: 'MM/DD/YYYY h:mm a'
  });
}

export default function({ deployment, deleteDeployment }) {
  const { created, state, scale: { current, max }, uid, url, aliases } = deployment;
  return (
    <div className="root">
      <style jsx>{`
        .root {
          display: flex;
        }
        .deploy-property {
          width: 100px;
          margin-right: 16px;
        }
        .uid, .url {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .uid {
          color: gray;
          max-width: 220px;
        }
        .url {
          width: 220px;
        }
        .created {
          width: 200px;
        }
        a {
          color: white;
          text-decoration: none;
        }
        a:hover {
          color: #06b0d7;
          text-decoration: underline;
        }
        .remove-link, .aliases-link, .more-link {
          width: 60px;
        }
        .remove-link:hover, .aliases-link:hover, .more-link:hover {
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
      {
        (aliases && aliases.length) ? (
            <div className="deploy-property aliases-link">
              aliases
            </div>
          ) : (
            <div className="deploy-property aliases-link" />
          )
      }
      <div
        className="deploy-property remove-link"
        onClick={() => deleteDeployment(uid)}
      >
        delete
      </div>
    </div>
  );
}
