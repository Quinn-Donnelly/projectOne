/*
 *
 * ManagerHomePage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, RECEIVED_ALL_REQUESTS, REVEIVED_ALL_EMPLOYEES } from './constants';

export const initialState = fromJS({
  requests: [],
  employees: [],
});

function managerHomePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case RECEIVED_ALL_REQUESTS:
      return state
        .set('requests', fromJS(action.requests));
    case REVEIVED_ALL_EMPLOYEES:
      return state
        .set('employees', fromJS(action.payload));
    default:
      return state;
  }
}

export default managerHomePageReducer;
