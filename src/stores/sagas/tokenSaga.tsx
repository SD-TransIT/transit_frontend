import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import { IToken } from 'models/token/IToken';
import { ITokenInput, ITokenRefreshInput } from 'models/token/ITokenInput';
import {
  fetchTokenFailure,
  fetchTokenSuccess,
  refreshTokenFailure,
  refreshTokenSuccess,
} from 'stores/actions/token/tokenActions';
import TokenActionTypes from 'stores/actions/token/tokenActionTypes';
import { sessionToken } from 'stores/reducers/tokenReducer';
import apiClient from 'utils/apiClient';

const postToken = async (payload: ITokenInput) => {
  const { data } = await apiClient.post(
    'token/',
    { username: payload.username, password: payload.password },
  );
  return data;
};

export const refreshToken = async (payload: ITokenRefreshInput) => {
  const { data } = await apiClient.post(
    'token/refresh/',
    { refresh: payload.refresh },
  );
  data.refresh = payload.refresh;
  return data;
};

function* fetchTokenSaga(action: any) {
  try {
    const response: { token: IToken } = yield call(postToken, {
      username: action.payload.values.username,
      password: action.payload.values.password,
    });

    yield put(fetchTokenSuccess(response));
    yield put({ type: TokenActionTypes.FETCH_TOKEN_SUCCESS, token: response });

    localStorage.setItem(sessionToken, JSON.stringify(response));

    action.payload.callback(response.token);
  } catch (error: any) {
    yield put(fetchTokenFailure(error));
    yield put({ type: TokenActionTypes.FETCH_TOKEN_FAILURE, error });
  }
}

function* refreshTokenSaga(action: any) {
  try {
    const response: { token: IToken } = yield call(refreshToken, {
      refresh: action.payload.values.refresh,
    });

    yield put(refreshTokenSuccess(response));
    yield put({ type: TokenActionTypes.REFRESH_TOKEN_SUCCESS, token: response });

    localStorage.setItem(sessionToken, JSON.stringify(response));

    action.payload.callback(response.token);
  } catch (error: any) {
    yield put(refreshTokenFailure(error));
    yield put({ type: TokenActionTypes.REFRESH_TOKEN_FAILURE, error });
  }
}

function* tokenSaga() {
  yield all([takeLatest(TokenActionTypes.FETCH_TOKEN_REQUEST, fetchTokenSaga)]);
  yield all([takeLatest(TokenActionTypes.REFRESH_TOKEN_REQUEST, refreshTokenSaga)]);
}

export default tokenSaga;
