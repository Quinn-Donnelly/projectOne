/*
 *
 * EmployeeHomePage actions
 *
 */

import { 
  DEFAULT_ACTION,
  GET_OWNED_REQUESTS,
  RECEIVED_OWNED_REQUESTS,
  ERROR_FETCHING_OWNED_REQUESTS,
  SUBMIT_REQUEST,
  ERROR_SUBMITTING_REQUEST,
  SUCCESS_SUBMITTING_REQUEST,
  GET_EMPLOYEE_INFORMATION,
  RECEIVED_EMPLOYEE_INFORMATION,
  UPDATE_EMPLOYEE,
} from './constants';

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

export function submitRequest(title, description, amount) {
  return {
    type: SUBMIT_REQUEST,
    title,
    description,
    amount,
  };
}

export function errorSubmittingRequest(err) {
  return {
    type: ERROR_SUBMITTING_REQUEST,
    error: err,
  };
}

export function successSubmittingRequest(id) {
  return {
    type: SUCCESS_SUBMITTING_REQUEST,
    id,
  }
}

export function getEmployeeInformation() {
  return {
    type: GET_EMPLOYEE_INFORMATION,
  };
}

export function storeEmployeeInformation(payload) {
  return {
    type: RECEIVED_EMPLOYEE_INFORMATION,
    payload,
  };
}

export function updateEmployee(payload) {
  return {
    type: UPDATE_EMPLOYEE,
    payload,
  };
}