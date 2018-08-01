import { takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { API_URL } from 'containers/App/constants';

import { GET_OWNED_REQUESTS, SUBMIT_REQUEST } from './constants';
import { storeOwnedRequests, errorFetchingRequests, errorSubmittingRequest, successSubmittingRequest } from './actions';

export function* getRequests() {
  // TODO: Select username from store
  const id = 1;
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
  const id = 1;
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
    yield put(errorSubmittingRequest(err));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_OWNED_REQUESTS, getRequests);
  yield takeLatest(SUBMIT_REQUEST, submitRequest);
}
