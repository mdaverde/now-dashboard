import moment from 'moment';
import DeployState from './components/DeployState';

export default function({ deployment }) {
  const { created, state, scale: { current, max }, uid, url } = deployment
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
          width: 220px;
          margin-right: 16px;
        }
        .url {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .created {
          width: 175px;
        }
        .scale {
          width: 100px;
        }
        .state {
          width: 150px;
        }
      `}</style>
      <div className="deploy-property url">{url}</div>
      <div className="deploy-property created">{(moment(created, 'x').calendar())}</div>
      <div className="deploy-property scale">{current} / {max} instances</div>
      <div className="deploy-property state">
        <DeployState state={state} />
      </div>
    </div>
  );
}
