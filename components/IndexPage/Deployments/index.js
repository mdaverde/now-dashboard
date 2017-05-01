// @flow
import React, { Component } from 'react';
import _ from 'lodash';

export default class extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="root">
        <style jsx>{`
          .root {
            font-family: 'Menlo'
          }
        `}</style>
        <div>Deployments</div>
      </div>
    )
  }
}
