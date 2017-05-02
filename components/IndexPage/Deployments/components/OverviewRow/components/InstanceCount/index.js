export default function({ instanceCount, instanceMax = 40 }) {
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
      <div className="instance-text">instances</div>
    </div>
  );
}
