// @flow
import React, { Component } from 'react';

export default class extends Component {
  handleOnSubmitBtnClick: () => void;
  props: {
    setToken: (tokenInputValue: string) => void
  }
  state: {
    tokenInputValue: string
  }
  constructor(props: Object) {
    super(props);
    this.handleOnSubmitBtnClick = this.handleOnSubmitBtnClick.bind(this);
    this.state = { tokenInputValue: '' };
  }
  handleOnSubmitBtnClick() {
    const { tokenInputValue } = this.state;
    if (tokenInputValue) {
      this.props.setToken(tokenInputValue);
    }
  }
  render() {
    const { tokenInputValue } = this.state;
    return (
      <div className="root">
        <style jsx>{`
          .root {
            margin: 30px 0;
          }
          .tokenInputParent {
            border-bottom: 2px solid #FFF;
            width: 350px;
            margin-left: auto;
            margin-right: auto;
            display: flex;
            padding: 10px 0;
          }
          .tokenInputLabel {
            font-family: Menlo;
            font-size: 13px;
            margin-right: 8px;
            line-height: 21px;
          }
          .tokenInput {
            font-family: Menlo;
            flex: 1 0 auto;
            display: block;
            font-size: 13px;
            border: none;
            background-color: transparent;
            color: #FFF;
            outline: none;
          }
          .seeDashBtn {
            font-family: Menlo;
            font-size: 12px;
            border: 2px solid #FFF;
            background-color: transparent;
            color: #FFF;
            text-transform: uppercase;
            display: block;
            margin-left: auto;
            margin-right: auto;
            width: 350px;
            margin-top: 25px;
            padding: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
            outline: none;
          }
          .seeDashBtn:hover {
            background-color: #FFF;
            color: #000;
          }
          .features {
            width: 700px;
            margin: 100px auto;
            font-family: Menlo;
            font-size: 13px;
          }
          .features-title {
            text-align: center;
          }
          .features-list {
            width: 600px;
            margin-left: auto;
            margin-right: auto;
          }
          .features-list li {
            margin: 20px;
          }
          .feature-coming-soon {
            color: gray;
          }
          .screenshot-title {
            width: 700px;
            margin-left: auto;
            margin-right: auto;
            font-family: Menlo;
            margin-top: 30px;
          }
          .screenshot-parent {
            position: relative;
            margin-top: 10px;
            margin-left: auto;
            margin-right: auto;
            overflow: hidden;
            height: 350px;
            border: 2px solid #FFF;
            width: 700px;
          }
          .screenshot {
            display: block;
            position: absolute;
            top: -50px;
            left: 0;
            width: 100%;
          }
          .link {
            display: block;
            font-family: Menlo;
            text-align: center;
            color: white;
            margin-top: 30px;
            font-size: 12px;
            text-decoration: none;
          }
          .link:hover {
            text-decoration: underline;
          }
          .source-link {
            margin-top: 30px;
          }
          .twitter-link {
            margin-top: 20px;
          }
        `}</style>
        <div className="tokenInputParent">
          <div className="tokenInputLabel">ZEIT API TOKEN:</div>
          <input
            type="text"
            className="tokenInput"
            placeholder="xxxxxxxxxxxxxxxxxxxxxxxx"
            value={tokenInputValue}
            onChange={(evt) => this.setState({ tokenInputValue: evt.target.value })}
          />
        </div>
        <button
          onClick={this.handleOnSubmitBtnClick}
          className="seeDashBtn"
        >
          Ready!
        </button>
        <div className="features">
          <div className="features-title">Features</div>
          <ul className="features-list">
            <li>See all project details and instances in one place</li>
            <li>Visualize current rate of deployment <span className="feature-coming-soon">(more metrics coming soon!)</span></li>
            <li>Manage deployments easily <span className="feature-coming-soon">(scaling coming soon!)</span></li>
          </ul>
        </div>
        <div className="screenshot-title">Screenshot</div>
        <div className="screenshot-parent">
          <img className="screenshot" src="/static/screenshot.png" />
        </div>
        <a className="link source-link" href="//github.com/mdaverde/now-dashboard">source</a>
        <a className="link twitter-link" href="//twitter.com/mdaverde">built by @mdaverde</a>
      </div>
    )
  }
}
