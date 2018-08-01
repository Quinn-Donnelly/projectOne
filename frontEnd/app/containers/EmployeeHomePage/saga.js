import { takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { API_URL } from 'containers/App/constants';

import { GET_OWNED_REQUESTS, SUBMIT_REQUEST } from './constants';
import { storeOwnedRequests, errorFetchingRequests } from './actions';

export function* getRequests(action) {
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
  console.log('was');
  

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

    yield call(getRequests);
    console.log(data);
  } catch (err) {
    // TODO: handle err
    console.log(err)
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_OWNED_REQUESTS, getRequests);
  yield takeLatest(SUBMIT_REQUEST, submitRequest);
}
