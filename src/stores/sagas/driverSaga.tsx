import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import { IDriver } from 'models/driver/IDriver';
import {
  deleteDriverFailure,
  deleteDriverSuccess,
  getDriverFailure, getDriverSuccess,
  postDriverFailure, postDriverSuccess,
  putDriverFailure, putDriverSuccess,
} from 'stores/actions/driver/driverActions';
import DriverActionTypes from 'stores/actions/driver/driverTypes';
import refreshAccessToken from 'stores/sagas/utils';
import {
  deleteRequest, getRequest, postRequest, putRequest,
} from 'utils/apiClient';

const driverUrl = 'driver/';

function* getDriverSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const response: { drivers: [IDriver] } = yield call(getRequest, driverUrl, {
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
    const responsePost: { driver: IDriver } = yield call(
      postRequest,
      driverUrl,
      action.payload,
    );
    yield put(postDriverSuccess(responsePost));
    yield put({
      type: DriverActionTypes.POST_DRIVER_SUCCESS,
      driver: responsePost,
    });
  } catch (error: any) {
    yield put(postDriverFailure(error));
    yield put({
      type: DriverActionTypes.POST_DRIVER_FAILURE,
      error,
    });
  }
}

function* putDriverSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePut: { driver: IDriver } = yield call(
      putRequest,
      driverUrl,
      action.payload,
      action.payload.id,
    );
    yield put(putDriverSuccess(responsePut));
    yield put({
      type: DriverActionTypes.PUT_DRIVER_SUCCESS,
      driver: responsePut,
    });
  } catch (error: any) {
    yield put(putDriverFailure(error));
    yield put({
      type: DriverActionTypes.PUT_DRIVER_FAILURE,
      error,
    });
  }
}

function* deleteDriverSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responseDelete: { driver: IDriver } = yield call(
      deleteRequest,
      driverUrl,
      action.payload.id,
    );
    yield put(deleteDriverSuccess(responseDelete));
    yield put({
      type: DriverActionTypes.DELETE_DRIVER_SUCCESS,
      driver: null,
    });
  } catch (error: any) {
    yield put(deleteDriverFailure(error));
    yield put({
      type: DriverActionTypes.DELETE_DRIVER_FAILURE,
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
