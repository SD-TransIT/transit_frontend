import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';
import apiClient from '../../utils/apiClient';
import { sessionToken } from '../reducers/tokenReducer';
import refreshAccessToken from './utils';
import { IDriver } from '../../models/driver/IDriver';
import DriverActionTypes from '../actions/driver/driverTypes';
import { getDriverFailure, getDriverSuccess } from '../actions/driver/driverActions';

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

function* driverSaga() {
  yield all([takeLatest(DriverActionTypes.GET_DRIVER_REQUEST, getDriverSaga)]);
}

export default driverSaga;
