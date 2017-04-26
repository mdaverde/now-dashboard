import React, { Component } from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { tokenInputValue: '' };
  }
  render() {
    const { tokenInputValue } = this.state;
    return (
      <div className="root">
        <style jsx>{`
          .root {
            margin-top: 30px;
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
          }
          .seeDashBtn:hover {
            background-color: #FFF;
            color: #000;
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
        <button className="seeDashBtn">Show me!</button>
      </div>
    )
  }
}
