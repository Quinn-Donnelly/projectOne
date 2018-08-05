import { select, takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { API_URL } from 'containers/App/constants';
import { push } from 'react-router-redux';
import { createSelectCurrentUser, makeSelectCurrentUser } from '../NavigationBar/selectors';

import { GET_OWNED_REQUESTS, SUBMIT_REQUEST, GET_EMPLOYEE_INFORMATION, UPDATE_EMPLOYEE } from './constants';
import { storeOwnedRequests,
  errorFetchingRequests,
  errorSubmittingRequest,
  successSubmittingRequest,
  storeEmployeeInformation,
} from './actions';

export function* getRequests() {
  // TODO: Select username from store
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
    
    yield put(storeOwnedRequests(data.requests));
  } catch (err) {
    yield put(errorFetchingRequests("Unable to fetch request for the logged in user"));
  }
}

export function* submitRequest(action) {
  // TODO: Select username from store
  const currentUser = yield select(makeSelectCurrentUser());
  if (!currentUser) {
    yield put(push('/login'));
    return;
  }

  const id = currentUser.employee_id;
  const requestURL = `${API_URL}/request`;

  try {
    const data = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({
        requester_id: id,
        title: action.title,
        description: action.description,
        amount: action.amount,
      }),
    });

    yield put(successSubmittingRequest(data.request_id));
    yield call(getRequests);
  } catch (err) {    
    yield put(errorSubmittingRequest('Invalid Request'));
  }
}

export function* getEmployeeInformation() {
  const currentUser = yield select(makeSelectCurrentUser());
  if (!currentUser) {
    return;
  }
  
  const id = currentUser.employee_id;
  const requestURL = `${API_URL}/employee/${id}`;

  try {
    const data = yield call(request, requestURL, {
      method: 'GET',
      mode: 'cors',
    });

    yield put(storeEmployeeInformation(data));
  } catch(e) {
    console.log(e);
    
  }
}

export function* updateEmployee(action) {
  const currentUser = yield select(makeSelectCurrentUser());
  if (!currentUser) {
    return;
  }

  const id = currentUser.employee_id;
  const requestURL = `${API_URL}/employee/${id}`;
  console.log('going')

  try {
    const data = yield call(request, requestURL, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify({
        first_name: action.payload.firstName,
        last_name: action.payload.lastName,
        email: action.payload.email
      }),
    });

    yield put(storeEmployeeInformation(data));
  } catch(e) {
    console.log(e); 
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_OWNED_REQUESTS, getRequests);
  yield takeLatest(SUBMIT_REQUEST, submitRequest);
  yield takeLatest(GET_EMPLOYEE_INFORMATION, getEmployeeInformation);
  yield takeLatest(UPDATE_EMPLOYEE, updateEmployee);
}
