import { takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { API_URL } from 'containers/App/constants';

import { GET_OWNED_REQUESTS } from './constants';
import { storeOwnedRequests, errorFetchingRequests } from './actions';

export function* getRequests(action) {
  // Select username from store
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

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_OWNED_REQUESTS, getRequests);
}
