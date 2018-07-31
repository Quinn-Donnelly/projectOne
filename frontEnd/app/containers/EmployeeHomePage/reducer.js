/*
 *
 * EmployeeHomePage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, RECEIVED_OWNED_REQUESTS } from './constants';

export const initialState = fromJS({
  requests: [],
});

function employeeHomePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case RECEIVED_OWNED_REQUESTS:
      return state
        .set('requests', fromJS(action.requests));
    default:
      return state;
  }
}

export default employeeHomePageReducer;
