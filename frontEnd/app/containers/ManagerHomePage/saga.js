import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'react-router-redux';
import { makeSelectCurrentUser } from '../NavigationBar/selectors';
import { API_URL } from 'containers/App/constants';

import { GET_ALL_REQUESTS, RESOLVE_REQUEST, GET_ALL_EMPLOYEES, ADD_USER, DELETE_USER } from './constants';
import { storeAllRequests, errorFetchingRequests, storeAllEmployees } from './actions';

export function* getRequests() {
  const currentUser = yield select(makeSelectCurrentUser());
  if (!currentUser) {
    yield put(push('/login'));
    return;
  }

  const id = currentUser.employee_id;
  const requestURL = `${API_URL}/employee/${id}/requests`;
  

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL, {
      method: 'GET',
    });
    
    yield put(storeAllRequests(data.requests));
  } catch (err) {
    yield put(errorFetchingRequests("Unable to fetch request for the logged in user"));
  }
}

export function* resolveRequest(action) {
  const currentUser = yield select(makeSelectCurrentUser());
  if (!currentUser) {
    yield put(push('/login'));
    return;
  }

  const id = currentUser.employee_id;
  const requestURL = `${API_URL}/requests/${action.request_id}/resolve`;

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({
        resolver_id: id,
        resolution_note: action.description,
        approoved: action.approved,
      }),
    });
    
    console.log(data);
    
    yield call(getRequests);
  } catch (err) {
    console.log(err);
    
    //yield put(errorFetchingRequests("Unable to fetch request for the logged in user"));
  }
}


export function* getEmployees() {
  const currentUser = yield select(makeSelectCurrentUser());
  if (!currentUser) {
    yield put(push('/login'));
    return;
  }

  const id = currentUser.employee_id;
  const requestURL = `${API_URL}/employees`;

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL, {
      method: 'GET',
    });
    
    yield put(storeAllEmployees(data.employees));
  } catch (err) {
    console.log(err);
    
    //yield put(errorFetchingRequests("Unable to fetch request for the logged in user"));
  }
}

export function* addUser(action) {
  const currentUser = yield select(makeSelectCurrentUser());
  if (!currentUser) {
    yield put(push('/login'));
    return;
  }

  const id = currentUser.employee_id;
  const requestURL = `${API_URL}/employee`;

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({
        "first_name": action.payload.firstName,
        "last_name": action.payload.lastName,
        "email": action.payload.email,
        "password": "123",
        "manager_id": id,
        "address": {
          "country": action.payload.country,
          "state": action.payload.state,
          "street": action.payload.street,
          "zipcode": action.payload.zipcode
        }
      }),
    });
    
    yield call(getEmployees);
  } catch (err) {
    console.log(err);
    
    //yield put(errorFetchingRequests("Unable to fetch request for the logged in user"));
  }
}

export function* deleteUser(action) {
  const currentUser = yield select(makeSelectCurrentUser());
  if (!currentUser) {
    yield put(push('/login'));
    return;
  }

  const id = currentUser.employee_id;
  const requestURL = `${API_URL}/employee/${action.id}`;

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL, {
      method: 'DELETE',
    });
  } catch (err) {
    console.log(err);
    //yield put(errorFetchingRequests("Unable to fetch request for the logged in user"));
  }

  yield call(getEmployees);
  yield call(getRequests);
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_ALL_REQUESTS, getRequests);
  yield takeLatest(RESOLVE_REQUEST, resolveRequest);
  yield takeLatest(GET_ALL_EMPLOYEES, getEmployees);
  yield takeLatest(ADD_USER, addUser);
  yield takeLatest(DELETE_USER, deleteUser);
}
