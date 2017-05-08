// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import NProgress from 'nprogress';
import cookies from 'js-cookie';
import nextCookies from 'next-cookies';
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
    this.logOut = this.logOut.bind(this);
    this.state = _.pick(props, ['token', 'deployments', 'loggedIn']);
  }
  static async getInitialProps(params) {
    const { token } = nextCookies(params);
    const initialProps =  { token, deployments: null, loggedIn: false };
    if (token) {
      initialProps.deployments = await getDeployments(token);
      initialProps.loggedIn = true;
    }
    return initialProps;
  }
  async setToken(token: ?string) {
    if (token && !(token === _.get(this.props, 'url.query.token'))) {
      NProgress.start();
      const deployments = await getDeployments(token);
      this.setState({ token, deployments, loggedIn: true });
      cookies.set('token', token);
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
  logOut() {
    this.setState({ loggedIn: false, deployments: null });
    cookies.remove('token');
  }
  render() {
    const { deployments, loggedIn } = this.state;
    return (
      <Layout>
        <style jsx>{`
          .header {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-top: 20px;
            margin-bottom: 20px;
          }
          .title {
            display: flex;
            justify-content: center;
          }
          .logo {
            display: block;
            height: 70px;
            line-height: 18px;
          }
          .now-text {
            font-size: 2em;
            text-align: center;
            margin-top: 17px;
            margin-left: -7px;
          }
          .now-word {
            font-weight: 400;
            font-weight: normal;
          }
          .log-out {
            color: white;
            font-size: 12px;
            text-align: center;
            cursor: pointer;
          }
          .log-out:hover {
            text-decoration: underline;
          }
        `}</style>
        <div className="header">
          <div className="title">
            <img className="logo" src="/static/now-logo.png" />
            <div className="now-text">
              <span className="now-word">now</span> dashboard
            </div>
          </div>
          {
            loggedIn && (
              <div
                className="log-out"
                onClick={this.logOut}
              >
                log out
              </div>
            )
          }
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
