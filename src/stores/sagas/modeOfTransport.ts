import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import { IModeOfTransport } from '../../models/modeOfTransport/IModeOfTransport';
import apiClient from '../../utils/apiClient';
import {
  getModeOfTransportFailure,
  getModeOfTransportSuccess,
  postModeOfTransportFailure,
  postModeOfTransportSuccess,
  putModeOfTransportFailure,
  putModeOfTransportSuccess,
} from '../actions/modeOfTransport/modeOfTransportAction';
import ModeOfTransportActionTypes from '../actions/modeOfTransport/modeOfTransportTypes';
import { sessionToken } from '../reducers/tokenReducer';

import refreshAccessToken from './utils';

const modeOfTransportUrl = 'mode_of_transport/';

const getModeOfTransport = async (parameters: any) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const additionalParamString = parameters.searcher !== null ? `?search=${parameters.searcher}` : '';
  const { data } = await apiClient.get(
    `${modeOfTransportUrl}${additionalParamString}`,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return Object.prototype.hasOwnProperty.call(data, 'results') ? data.results : data;
};

const postModeOfTransport = async (payload: IModeOfTransport) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const { data } = await apiClient.post(
    modeOfTransportUrl,
    payload,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};

const putModeOfTransport = async (payload: IModeOfTransport, id: number) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const { data } = await apiClient.put(
    `${modeOfTransportUrl}${id}/`,
    payload,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};

function* getModeOfTransportSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const response: { modes: [IModeOfTransport] } = yield call(getModeOfTransport, {
      searcher: action.payload?.search ?? null,
    });
    yield put(getModeOfTransportSuccess(response));
    yield put({
      type: ModeOfTransportActionTypes.GET_MODE_OF_TRANSPORT_SUCCESS,
      modes: response,
    });
  } catch (error: any) {
    yield put(getModeOfTransportFailure(error));
    yield put({ type: ModeOfTransportActionTypes.GET_MODE_OF_TRANSPORT_FAILURE, error });
  }
}

function* postModeOfTransportSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePost: { mode: IModeOfTransport } = yield call(
      postModeOfTransport,
      action.payload,
    );
    const responseGet: { mode: IModeOfTransport } = yield call(getModeOfTransport, {
      searcher: action.payload?.search ?? null,
    });
    yield put(postModeOfTransportSuccess(responsePost));
    yield put({
      type: ModeOfTransportActionTypes.POST_MODE_OF_TRANSPORT_SUCCESS,
      mode: responsePost,
      modes: responseGet,
    });
  } catch (error: any) {
    yield put(postModeOfTransportFailure(error));
    yield put({
      type: ModeOfTransportActionTypes.POST_MODE_OF_TRANSPORT_FAILURE,
      error,
    });
  }
}

function* putModeOfTransportSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePut: { mode: IModeOfTransport } = yield call(
      putModeOfTransport,
      action.payload,
      action.payload.id,
    );
    const responseGet: { mode: IModeOfTransport } = yield call(getModeOfTransport, {
      searcher: action.payload?.search ?? null,
    });
    yield put(putModeOfTransportSuccess(responsePut));
    yield put({
      type: ModeOfTransportActionTypes.PUT_MODE_OF_TRANSPORT_SUCCESS,
      mode: responsePut,
      modes: responseGet,
    });
  } catch (error: any) {
    yield put(putModeOfTransportFailure(error));
    yield put({
      type: ModeOfTransportActionTypes.PUT_MODE_OF_TRANSPORT_FAILURE,
      error,
    });
  }
}

function* modeOfTransportSaga() {
  yield all([
    takeLatest(ModeOfTransportActionTypes.GET_MODE_OF_TRANSPORT_REQUEST, getModeOfTransportSaga),
  ]);
  yield all([
    takeLatest(ModeOfTransportActionTypes.POST_MODE_OF_TRANSPORT_REQUEST, postModeOfTransportSaga),
  ]);
  yield all([
    takeLatest(ModeOfTransportActionTypes.PUT_MODE_OF_TRANSPORT_REQUEST, putModeOfTransportSaga),
  ]);
}

export default modeOfTransportSaga;
