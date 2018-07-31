/*
 *
 * EmployeeHomePage actions
 *
 */

import { DEFAULT_ACTION, GET_OWNED_REQUESTS } from './constants';

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
