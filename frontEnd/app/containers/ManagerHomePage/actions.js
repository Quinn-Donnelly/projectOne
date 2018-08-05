/*
 *
 * ManagerHomePage actions
 *
 */

import { 
  DEFAULT_ACTION,
  GET_ALL_REQUESTS,
  RECEIVED_ALL_REQUESTS,
  ERROR_FETCHING_ALL_REQUESTS,
  RESOLVE_REQUEST,
  GET_ALL_EMPLOYEES,
  REVEIVED_ALL_EMPLOYEES,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}


export function getAllRequests() {
  return {
    type: GET_ALL_REQUESTS,
  };
}

export function storeAllRequests(requests) {
  return {
    type: RECEIVED_ALL_REQUESTS,
    requests,
  };
}

export function errorFetchingRequests(error) {
  return {
    type: ERROR_FETCHING_ALL_REQUESTS,
    error,
  };
}

export function resolveRequest(request_id, approved, description) {
  return {
    type: RESOLVE_REQUEST,
    request_id,
    approved,
    description,
  };
}

export function getAllEmployees() {
  return {
    type: GET_ALL_EMPLOYEES,
  };
}

export function storeAllEmployees(payload) {
  return {
    type: REVEIVED_ALL_EMPLOYEES,
    payload,
  };
}