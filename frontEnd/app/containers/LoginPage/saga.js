import { takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { API_URL } from 'containers/App/constants';
import { push } from 'react-router-redux';

import { ATTEMPT_LOGIN } from './constants';
import { loginFail, loginSuccess } from './actions';

export function* login(action) {
  // Select username from store
  const requestURL = `${API_URL}/login`;

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL, {
      method: 'POST',
      'Content-Type': 'application/json',
      mode: 'cors',
      body: JSON.stringify({
        username: action.username,
        password: action.password,
      }),
    });
    yield put(loginSuccess(data));
    if (data.manager_id === 0) {
      yield put(push('/managerHome'));  
    } else {
      yield put(push('/employeeHome'));
    }
  } catch (err) {
    console.log(err);
    yield put(loginFail("Incorrect username / password combination"));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(ATTEMPT_LOGIN, login);
}
