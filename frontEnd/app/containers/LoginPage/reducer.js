/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  ATTEMPT_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: null,
  user: null,
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case ATTEMPT_LOGIN:
      return state.set('loading', true);
    case LOGIN_SUCCESS:
      return state
        .set('loading', false)
        .set('error', null)
        .set('user', action.payload);
    case LOGIN_FAIL:
      return state
        .set('loading', false)
        .set('user', null)
        .set('error', action.msg);
    case LOGOUT:
      return state
        .set('loading', false)
        .set('error', null)
        .set('user', null);
    default:
      return state;
  }
}

export default loginPageReducer;
