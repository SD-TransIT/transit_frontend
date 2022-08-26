import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';
import apiClient from '../../utils/apiClient';
import { IToken } from '../../models/token/IToken';
import { fetchTokenFailure, fetchTokenSuccess } from '../actions/token/tokenActions';
import TokenActionTypes from '../actions/token/tokenActionTypes';
import { ITokenInput, ITokenRefreshInput } from '../../models/token/ITokenInput';
import { sessionToken } from '../reducers/tokenReducer';

const postToken = async (payload: ITokenInput) => {
  const { data } = await apiClient.post(
    'token/',
    { username: payload.username, password: payload.password },
  );
  return data;
};

const refreshToken = async (payload: ITokenRefreshInput) => {
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

    yield put(fetchTokenSuccess(response));
    yield put({ type: TokenActionTypes.REFRESH_TOKEN_SUCCESS, token: response });

    localStorage.setItem(sessionToken, JSON.stringify(response));

    action.payload.callback(response.token);
  } catch (error: any) {
    yield put(fetchTokenFailure(error));
    yield put({ type: TokenActionTypes.REFRESH_TOKEN_FAILURE, error });
  }
}

function* tokenSaga() {
  yield all([takeLatest(TokenActionTypes.FETCH_TOKEN_REQUEST, fetchTokenSaga)]);
  yield all([takeLatest(TokenActionTypes.REFRESH_TOKEN_REQUEST, refreshTokenSaga)]);
}

export default tokenSaga;
