/*
 *
 * NavigationBar reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION,  } from './constants';
import { LOGIN_SUCCESS, LOGOUT } from '../LoginPage/constants';

export const initialState = fromJS({
  currentUser: null,
});

function navigationBarReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOGIN_SUCCESS:
      return state
        .set('currentUser', action.payload)
    case LOGOUT:
      return state
        .set('currentUser', null);
    default:
      return state;
  }
}

export default navigationBarReducer;
