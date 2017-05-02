// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import Router from 'next/router';
import Layout from '../components/Layout';
import TokenInput from '../components/IndexPage/TokenInput';
import Deployments from '../components/IndexPage/Deployments';
import Now from '../data/now';

export default class extends Component {
  setToken: (token: ?string) => void;
  deleteDeployment: (uid: string) => Promise<void>;
  state: {
    deployments: ?Object[],
    token: ?string,
  }
  props: {
    deployments: ?Object[]
  }
  constructor(props: Object) {
    super(props);
    this.setToken = this.setToken.bind(this);
    this.deleteDeployment = this.deleteDeployment.bind(this);
    this.state = { token: props.token, deployments: props.deployments };
  }
  static async getInitialProps({ query }) {
    const initialProps =  { token: query.token, deployments: null };
    if (query.token) {
      const deployments = await Now(query.token).getDeployments();
      initialProps.deployments = deployments;
    }
    return initialProps;
  }
  async setToken(token: ?string) {
    if (token && !(token === _.get(this.props, 'url.query.token'))) {
      Router.push('/', {
        query: { token }
      });
      const deployments = await Now(token).getDeployments();
      this.setState({ token, deployments });
    }
  }
  async deleteDeployment(uid: string) {
    if (!uid) return;
    if (!confirm(`Are you sure you want to delete deployment ${uid}?`)) return;
    const { token } = this.state;
    await Now(token).deleteDeployment(uid);
    this.setState({ deployments: await Now(token).getDeployments() });
  }
  render() {
    const { deployments } = this.state;
    return (
      <Layout>
        <style jsx>{`
          .title {
            font-size: 2em;
            text-align: center;
            margin-top: 50px;
            margin-bottom: 20px;
          }
          .now-word {
            font-weight: 400;
            font-weight: normal;
          }
        `}</style>
        <div className="title">
          <span className="now-word">now</span> dashboard
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
