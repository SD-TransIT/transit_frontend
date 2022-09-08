import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';
import apiClient from '../utils/apiClient';
import { sessionToken } from '../reducers/tokenReducer';
import refreshAccessToken from './utils';
import { IDriver } from '../models/driver/IDriver';
import DriverActionTypes from '../actions/driver/driverTypes';
import {
  deleteDriverFailure,
  deleteDriverSuccess,
  getDriverFailure, getDriverSuccess,
  postDriverFailure, postDriverSuccess,
  putDriverFailure, putDriverSuccess,
} from '../actions/driver/driverActions';

const driverUrl = 'driver/';

const getDriver = async (parameters: any) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const additionalParamString = parameters.searcher !== null ? `?search=${parameters.searcher}` : '';
  const { data } = await apiClient.get(
    `${driverUrl}${additionalParamString}`,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return Object.prototype.hasOwnProperty.call(data, 'results') ? data.results : data;
};

const postDriver = async (payload: IDriver) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const { data } = await apiClient.post(
    driverUrl,
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

const putDriver = async (payload: IDriver, id: number) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const { data } = await apiClient.put(
    `${driverUrl}${id}/`,
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

const deleteDriver = async (id: number) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const { data } = await apiClient.delete(
    `${driverUrl}${id}/`,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};

function* getDriverSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const response: { drivers: [IDriver] } = yield call(getDriver, {
      searcher: action.payload?.search ?? null,
    });
    yield put(getDriverSuccess(response));
    yield put({ type: DriverActionTypes.GET_DRIVER_SUCCESS, drivers: response });
  } catch (error: any) {
    yield put(getDriverFailure(error));
    yield put({ type: DriverActionTypes.GET_DRIVER_FAILURE, error });
  }
}

function* postDriverSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePost: { driver: IDriver } = yield call(postDriver, action.payload);
    const responseGet: { driver: IDriver } = yield call(getDriver, {
      searcher: action.payload?.search ?? null,
    });
    yield put(postDriverSuccess(responsePost));
    yield put({
      type: DriverActionTypes.POST_DRIVER_SUCCESS,
      driver: responsePost,
      drivers: responseGet,
    });
  } catch (error: any) {
    const responseGet: { customerType: IDriver } = yield call(getDriver, {
      searcher: action.payload?.search ?? null,
    });
    yield put(postDriverFailure(error));
    yield put({
      type: DriverActionTypes.POST_DRIVER_FAILURE,
      drivers: responseGet,
      error,
    });
  }
}

function* putDriverSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePut: { driver: IDriver } = yield call(
      putDriver,
      action.payload,
      action.payload.id,
    );
    const responseGet: { drivers: IDriver } = yield call(getDriver, {
      searcher: action.payload?.search ?? null,
    });
    yield put(putDriverSuccess(responsePut));
    yield put({
      type: DriverActionTypes.PUT_DRIVER_SUCCESS,
      driver: responsePut,
      drivers: responseGet,
    });
  } catch (error: any) {
    const responseGet: { drivers: IDriver } = yield call(getDriver, {
      searcher: action.payload?.search ?? null,
    });
    yield put(putDriverFailure(error));
    yield put({
      type: DriverActionTypes.PUT_DRIVER_FAILURE,
      drivers: responseGet,
      error,
    });
  }
}

function* deleteDriverSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responseDelete: { driver: IDriver } = yield call(
      deleteDriver,
      action.payload.id,
    );
    const responseGet: { drivers: IDriver } = yield call(getDriver, {
      searcher: action.payload?.search ?? null,
    });
    yield put(deleteDriverSuccess(responseDelete));
    yield put({
      type: DriverActionTypes.DELETE_DRIVER_SUCCESS,
      drivers: responseGet,
    });
  } catch (error: any) {
    const responseGet: { drivers: IDriver } = yield call(getDriver, {
      searcher: action.payload?.search ?? null,
    });
    yield put(deleteDriverFailure(error));
    yield put({
      type: DriverActionTypes.DELETE_DRIVER_FAILURE,
      drivers: responseGet,
      error,
    });
  }
}

function* driverSaga() {
  yield all([takeLatest(DriverActionTypes.GET_DRIVER_REQUEST, getDriverSaga)]);
  yield all([takeLatest(DriverActionTypes.POST_DRIVER_REQUEST, postDriverSaga)]);
  yield all([takeLatest(DriverActionTypes.PUT_DRIVER_REQUEST, putDriverSaga)]);
  yield all([takeLatest(
    DriverActionTypes.DELETE_DRIVER_REQUEST,
    deleteDriverSaga,
  )]);
}

export default driverSaga;
