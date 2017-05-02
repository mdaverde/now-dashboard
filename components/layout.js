import Head from 'next/head';
import AppContainer from './AppContainer';

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
      <title>now dashboard</title>
      <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
      <style>{globalStyles}</style>
    </Head>
    <AppContainer>
      {children}
    </AppContainer>
  </div>
);
