/*
 *
 * EmployeeHomePage reducer
 *
 */

import { fromJS, List } from 'immutable';
import { DEFAULT_ACTION, RECEIVED_OWNED_REQUESTS, ERROR_SUBMITTING_REQUEST, SUBMIT_REQUEST, SUCCESS_SUBMITTING_REQUEST } from './constants';

export const initialState = fromJS({
  requests: [],
  submitRequest: {
    loading: false,
    error: null,
    id: 0,
  }
});

function employeeHomePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case RECEIVED_OWNED_REQUESTS:
      return state
        .set('requests', fromJS(action.requests));
    case SUBMIT_REQUEST:
      return state
        .set('submitRequest', {
          loading: true,
          error: null,
          id: 0,
        });
    case SUCCESS_SUBMITTING_REQUEST:
        return state
          .set('submitRequest', {
            loading: false,
            error: null,
            id: action.id,
          });
    case ERROR_SUBMITTING_REQUEST:
      return state
        .set('submitRequest', {
          loading: false,
          error: action.error,
          id: 0,
        });
    default:
      return state;
  }
}

export default employeeHomePageReducer;
