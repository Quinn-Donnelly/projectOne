/*
 *
 * EmployeeHomePage reducer
 *
 */

import { fromJS, List } from 'immutable';
import { 
  DEFAULT_ACTION, 
  RECEIVED_OWNED_REQUESTS, 
  ERROR_SUBMITTING_REQUEST, 
  SUBMIT_REQUEST,
  SUCCESS_SUBMITTING_REQUEST, 
  RECEIVED_EMPLOYEE_INFORMATION,
} from './constants';
import { LOGOUT } from '../LoginPage/constants';

export const initialState = fromJS({
  requests: [],
  submitRequest: {
    loading: false,
    error: null,
    id: 0,
  },
  employeeInformation: {
    firstName: '',
    lastName: '',
    email: '', 
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
        .set('submitRequest', fromJS( {
          loading: true,
          error: null,
          id: 0,
        }));
    case SUCCESS_SUBMITTING_REQUEST:
      return state
        .set('submitRequest', fromJS({
          loading: false,
          error: null,
          id: action.id,
        }));
    case ERROR_SUBMITTING_REQUEST:
      return state
        .set('submitRequest', fromJS({
          loading: false,
          error: action.error,
          id: 0,
        }));
    case LOGOUT:
      return state
        .set('requests', [])
        .set('submitRequest', fromJS({
          loading: false,
          error: null,
          id: 0,
        }))
        .set('employeeInformation', fromJS({
          firstName: '',
          lastName: '',
          email: '', 
        }));
    case RECEIVED_EMPLOYEE_INFORMATION:
      return state
        .setIn(['employeeInformation','firstName'], action.payload.first_name)
        .setIn(['employeeInformation','lastName'], action.payload.last_name)
        .setIn(['employeeInformation','email'], action.payload.email);
    default:
      return state;
  }
}

export default employeeHomePageReducer;
