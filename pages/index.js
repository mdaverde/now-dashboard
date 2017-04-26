import Layout from '../components/layout';

export default () => (
  <Layout>
    <style jsx>{`
      .title {
        font-size: 2em;
        text-align: center;
        margin-top: 50px;
      }
      .now-word {
        font-weight: 400;
        font-weight: normal;
      }
    `}</style>
    <div className="title">
      <span className="now-word">now</span> dashboard
    </div>
  </Layout>
)
