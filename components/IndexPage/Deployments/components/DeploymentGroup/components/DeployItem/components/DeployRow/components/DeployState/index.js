import React from 'react';

export default function({ state }) {
  const stateText = state.toLowerCase();
  return (
    <div className="root">
      <style jsx>{`
        .building {
          color: #4fc3f7;
        }
        .ready {
          color: #81c784;
        }
        .frozen {
          color: gray;
        }
        .deployment_error {
          color: #e57373 ;
        }
      `}</style>
      <span className={stateText}>{stateText}</span>
    </div>
  );
}
