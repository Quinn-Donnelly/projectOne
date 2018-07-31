/*
 *
 * EmployeeHomePage actions
 *
 */

import { DEFAULT_ACTION, GET_OWNED_REQUESTS, RECEIVED_OWNED_REQUESTS, ERROR_FETCHING_OWNED_REQUESTS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getOwnedRequests() {
  return {
    type: GET_OWNED_REQUESTS,
  };
}

export function storeOwnedRequests(requests) {
  return {
    type: RECEIVED_OWNED_REQUESTS,
    requests,
  };
}

export function errorFetchingRequests(error) {
  return {
    type: ERROR_FETCHING_OWNED_REQUESTS,
    error,
  };
}