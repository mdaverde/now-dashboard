import Head from 'next/head';

const globalStyles = `
  body {
    font-family: -apple-system,
                  BlinkMacSystemFont,
                  "Segoe UI",
                  "Roboto",
                  "Oxygen",
                  "Ubuntu",
                  "Cantarell",
                  "Fira Sans",
                  "Droid Sans",
                  "Helvetica Neue",
                  sans-serif;
    font-weight: 200;
    background-color: #000;
    color: #FFF;
  }
`;

export default ({ children }) => (
  <div>
    <Head>
      <meta charSet="utf-8" />
      <title>Now Dashboard</title>
      <style>{globalStyles}</style>
    </Head>
    {children}
  </div>
);
