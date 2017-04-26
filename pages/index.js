import React, { Component } from 'react';
import Layout from '../components/Layout';
import TokenInput from '../components/IndexPage/TokenInput'

export default class extends Component {
  static async getInitialProps({ query }) {
    return { tokenAvailable: !!query.token };
  }
  render() {
    const { tokenAvailable } = this.props;
    return (
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
          {
            tokenAvailable ? null : (
              <TokenInput />
            )
          }
        </div>
      </Layout>
    );
  }
}
