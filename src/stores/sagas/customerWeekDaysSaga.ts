import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import { ICustomerWeekDaysType } from 'models/customerWeekDays/ICustomerWeekDaysType';
import {
  getCustomerWeekDaysFailure,
  getCustomerWeekDaysSuccess,
  postCustomerWeekDaysFailure,
  postCustomerWeekDaysSuccess,
} from 'stores/actions/customerWeekDays/customerWeekDaysActions';
import CustomerWeekDaysActionTypes from 'stores/actions/customerWeekDays/customerWeekDaysTypes';
import { sessionToken } from 'stores/reducers/tokenReducer';
import refreshAccessToken from 'stores/sagas/utils';
import apiClient, { getRequest } from 'utils/apiClient';

export const customerWeekDaysUrl = 'customer_week_days/';

export const postRequest = async (payload: object, id: number) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const { data } = await apiClient.post(
    `customer/${id}/replace_working_hours/`,
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
      action.payload,
      action.payload.id,
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
}

export default customerWeekDaysSaga;
