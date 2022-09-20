import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import { ICustomerWeekDaysType } from 'models/customerWeekDays/ICustomerWeekDaysType';
import {
  deleteCustomerWeekDaysFailure,
  deleteCustomerWeekDaysSuccess,
  getCustomerWeekDaysFailure,
  getCustomerWeekDaysSuccess,
  postCustomerWeekDaysFailure,
  postCustomerWeekDaysSuccess,
  putCustomerWeekDaysFailure,
  putCustomerWeekDaysSuccess,
} from 'stores/actions/customerWeekDays/customerWeekDaysActions';
import CustomerWeekDaysActionTypes from 'stores/actions/customerWeekDays/customerWeekDaysTypes';
import { sessionToken } from 'stores/reducers/tokenReducer';
import refreshAccessToken from 'stores/sagas/utils';
import apiClient, {
  deleteRequest, getRequest, postRequest,
} from 'utils/apiClient';

export const customerWeekDaysUrl = 'customer_week_days/';

const putRequest = async (url: string, payload: object, id: number) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const { data } = await apiClient.put(
    // to change url when backend will be ready
    `${url}${id}/`,
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

function* getCustomerWeekDaysSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const response: {
      customerWeekDays: [ICustomerWeekDaysType]
    } = yield call(getRequest, customerWeekDaysUrl, {
      searcher: action.payload?.search ?? null,
    });
    yield put(getCustomerWeekDaysSuccess(response));
    yield put({
      type: CustomerWeekDaysActionTypes.GET_CUSTOMER_WEEK_DAYS_SUCCESS,
      customerWeekDays: response,
    });
  } catch (error: any) {
    yield put(getCustomerWeekDaysFailure(error));
    yield put({ type: CustomerWeekDaysActionTypes.GET_CUSTOMER_WEEK_DAYS_FAILURE, error });
  }
}

function* postCustomerWeekDaysSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePost: { customerWeekDay: ICustomerWeekDaysType } = yield call(
      postRequest,
      customerWeekDaysUrl,
      action.payload,
    );
    yield put(postCustomerWeekDaysSuccess(responsePost));
    yield put({
      type: CustomerWeekDaysActionTypes.POST_CUSTOMER_WEEK_DAYS_SUCCESS,
      customerWeekDay: responsePost,
    });
  } catch (error: any) {
    yield put(postCustomerWeekDaysFailure(error));
    yield put({
      type: CustomerWeekDaysActionTypes.POST_CUSTOMER_WEEK_DAYS_FAILURE,
      error,
    });
  }
}

function* putCustomerWeekDaysSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePut: { customerWeekDay: ICustomerWeekDaysType } = yield call(
      putRequest,
      customerWeekDaysUrl,
      action.payload,
      action.payload.id,
    );
    yield put(putCustomerWeekDaysSuccess(responsePut));
    yield put({
      type: CustomerWeekDaysActionTypes.PUT_CUSTOMER_WEEK_DAYS_SUCCESS,
      customerWeekDay: responsePut,
    });
  } catch (error: any) {
    yield put(putCustomerWeekDaysFailure(error));
    yield put({
      type: CustomerWeekDaysActionTypes.PUT_CUSTOMER_WEEK_DAYS_FAILURE,
      error,
    });
  }
}

function* deleteCustomerWeekDaysSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responseDelete: { customerWeekDay: ICustomerWeekDaysType } = yield call(
      deleteRequest,
      customerWeekDaysUrl,
      action.payload.id,
    );
    yield put(deleteCustomerWeekDaysSuccess(responseDelete));
    yield put({
      type: CustomerWeekDaysActionTypes.DELETE_CUSTOMER_WEEK_DAYS_SUCCESS,
      customerWeekDay: null,
    });
  } catch (error: any) {
    yield put(deleteCustomerWeekDaysFailure(error));
    yield put({
      type: CustomerWeekDaysActionTypes.DELETE_CUSTOMER_WEEK_DAYS_FAILURE,
      error,
    });
  }
}

function* customerWeekDaysSaga() {
  yield all([
    takeLatest(CustomerWeekDaysActionTypes.GET_CUSTOMER_WEEK_DAYS_REQUEST, getCustomerWeekDaysSaga),
  ]);
  yield all([
    takeLatest(
      CustomerWeekDaysActionTypes.POST_CUSTOMER_WEEK_DAYS_REQUEST,
      postCustomerWeekDaysSaga,
    ),
  ]);
  yield all([
    takeLatest(CustomerWeekDaysActionTypes.PUT_CUSTOMER_WEEK_DAYS_REQUEST, putCustomerWeekDaysSaga),
  ]);
  yield all([
    takeLatest(
      CustomerWeekDaysActionTypes.DELETE_CUSTOMER_WEEK_DAYS_REQUEST,
      deleteCustomerWeekDaysSaga,
    )]);
}

export default customerWeekDaysSaga;
