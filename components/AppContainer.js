
export default function({ children }) {
  return (
    <div className="root">
      <style jsx>{`
        .root {
          width: 1000px;
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>
      {children}
    </div>
  );
}
