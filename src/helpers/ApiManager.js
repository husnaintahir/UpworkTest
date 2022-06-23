import axios from 'axios';

const _TIMEOUT = 15000;
let BASE_URL = '<any-remote-url>';

BASE_URL = 'http://localhost:3000/';

let ONLINE_STATUS = true;

const LOGIN = 'authenticate';

// GET Request
const sendGetRequest = async (_url, _params, headers) => {
  _url = BASE_URL + _url;

  try {
    let response = await axios.get(_url, {
      data: _params ? _params : null,
      headers: headers,
      timeout: _TIMEOUT,
    });

    ONLINE_STATUS = true;

    return response;
  } catch (error) {
    let err = [];
    err.error = error;
    err.no_result = true;
    if (ONLINE_STATUS != false) {
      ONLINE_STATUS = false;
      alert('Unable to connect with server');
    }
    return err;
  }
};

// POST Request
const sendPostRequest = async (
  _url,
  _body,
  headers,
  queryParams = {},
  config = {},
  customTimeout,
) => {
  _url = BASE_URL + _url;

  if (!_body) {
    _body = {};
  }

  if (!headers) {
    headers = {
      'Content-Type': 'application/json',
    };
  }

  try {
    let response = await axios({
      method: 'post',
      url: _url,
      data: _body,
      headers: headers,
      params: queryParams,
      timeout: customTimeout || _TIMEOUT,
      ...config,
    });

    ONLINE_STATUS = true;

    return response;
  } catch (error) {
    let err = [];
    err.error = error;
    err.no_result = true;
    setTimeout(() => {
      if (ONLINE_STATUS != false) {
        ONLINE_STATUS = false;
        alert('Unable to connect with server');
      }
    }, 400);
    return err;
  }
};

const login = async body => {
  const url = LOGIN;
  const queryParams = {};

  return sendPostRequest(url, body, null, queryParams);
};

export {
  BASE_URL,
  login,
};
