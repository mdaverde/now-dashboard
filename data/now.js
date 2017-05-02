// @flow
import 'isomorphic-fetch';

const ERROR = {
  MISSING_ID: {
    code: 'missing_id',
    message: 'Missing `id` parameter'
  },
  MISSING_FILE_ID: {
    code: 'missing_file_id',
    message: 'Missing `fileId` parameter'
  },
  MISSING_BODY: {
    code: 'missing_body',
    message: 'Missing `body` parameter'
  },
  MISSING_CN: {
    code: 'missing_cn',
    message: 'Missing `cn` parameter'
  },
  MISSING_ALIAS: {
    code: 'missing_body',
    message: 'Missing `alias` parameter'
  },
  MISSING_NAME: {
    code: 'missing_name',
    message: 'Missing `name` parameter'
  },
  MISSING_VALUE: {
    code: 'missing_value',
    message: 'Missing `value` parameter'
  }
}

class Now {
  constructor(token) {
    if (!token) {
      console.error('No token found!'); // eslint-disable-line no-console
    }
    this._token = token;
    this._baseUrl = 'https://api.zeit.co';
  }
  _generateUrl(path) {
    if (!path) {
      return this._baseUrl;
    }
    const splitter = path[0] === '/' ? '' : '/';
    return `${this._baseUrl}${splitter}${path}`;
  }
  handleRequest({ path, method, data, json }, selector) {
    const headers = {
      Authorization: `Bearer ${this._token}`
    };
    if (json) {
      headers['Content-Type'] = 'application/json';
    }
    return fetch(this._generateUrl(path), {
      headers, method,
      body: data && ((json && JSON.stringify(data)) || data)
    })
    .then(res => json ? res.json() : res.text())
    .then(res => json ? (selector ? res[selector] : res) : res);
  }
  getDeployments() {
    return this.handleRequest({
      path: '/now/deployments',
      method: 'GET',
      json: true
    }, 'deployments')
  }
  deleteDeployment(uid: string) {
    return this.handleRequest({
      path: `/now/deployments/${uid}`,
      method: 'DELETE',
      json: true
    });
  }
}

export default function(token) {
  return new Now(token);
}
