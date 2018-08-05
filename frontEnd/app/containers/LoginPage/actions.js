/*
 *
 * LoginPage actions
 *
 */

import {
  DEFAULT_ACTION,
  ATTEMPT_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function attemptLogin(username, password) {
  return {
    type: ATTEMPT_LOGIN,
    username,
    password,
  };
}

export function loginSuccess(payload) {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
}

export function loginFail(msg) {
  return {
    type: LOGIN_FAIL,
    msg,
  };
}
