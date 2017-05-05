// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import NProgress from 'nprogress'
import Router from 'next/router';
import Layout from '../components/Layout';
import TokenInput from '../components/IndexPage/TokenInput';
import Deployments from '../components/IndexPage/Deployments';
import getDeployments from '../data/getDeployments';
import Now from '../data/now';

export default class extends Component {
  setToken: (token: ?string) => void;
  deleteDeployment: (uid: string) => Promise<void>;
  state: {
    deployments: ?Object[],
    token: ?string,
  };
  props: {
    deployments: ?Object[]
  };
  constructor(props: Object) {
    super(props);
    this.setToken = this.setToken.bind(this);
    this.deleteDeployment = this.deleteDeployment.bind(this);
    this.state = { token: props.token, deployments: props.deployments };
  }
  static async getInitialProps({ query }) {
    const initialProps =  { token: query.token, deployments: null };
    if (query.token) {
      const deployments = await getDeployments(query.token);
      initialProps.deployments = deployments;
    }
    return initialProps;
  }
  async setToken(token: ?string) {
    if (token && !(token === _.get(this.props, 'url.query.token'))) {
      NProgress.start();
      Router.push('/', {
        query: { token }
      });
      const deployments = await getDeployments(token);
      this.setState({ token, deployments });
      NProgress.done();
    }
  }
  async deleteDeployment(uid: string) {
    if (!uid) return;
    if (!confirm(`Are you sure you want to delete deployment ${uid}?`)) return;
    NProgress.start();
    const { token } = this.state;
    await Now(token).deleteDeployment(uid);
    this.setState({ deployments: await getDeployments(token) });
    NProgress.done();
  }
  render() {
    const { deployments } = this.state;
    return (
      <Layout>
        <style jsx>{`
          .header {
            display: flex;
            justify-content: center;
            margin-top: 20px;
            margin-bottom: 20px;
          }
          .logo {
            display: block;
            height: 70px;
            line-height: 18px;
          }
          .title {
            font-size: 2em;
            text-align: center;
            margin-top: 17px;
            margin-left: -7px;
          }
          .now-word {
            font-weight: 400;
            font-weight: normal;
          }
        `}</style>
        <div className="header">
          <img className="logo" src="/static/now-logo.png" />
          <div className="title">
            <span className="now-word">now</span> dashboard
          </div>
        </div>
        {
          !deployments ? (
              <TokenInput
                setToken={this.setToken}
              />
            ) : (
              <Deployments
                deployments={deployments}
                deleteDeployment={this.deleteDeployment}
              />
          )
        }
      </Layout>
    );
  }
}
