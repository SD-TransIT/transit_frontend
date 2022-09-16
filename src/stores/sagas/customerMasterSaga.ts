import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import { ICustomerMaster } from 'models/customerMaster/ICustomerMaster';
import {
  deleteCustomerMasterFailure,
  deleteCustomerMasterSuccess,
  getCustomerMasterFailure,
  getCustomerMasterSuccess,
  postCustomerMasterFailure,
  postCustomerMasterSuccess,
  putCustomerMasterFailure,
  putCustomerMasterSuccess,
} from 'stores/actions/customerMaster/customerMasterActions';
import CustomerMasterActionTypes from 'stores/actions/customerMaster/customerMasterTypes';
import refreshAccessToken from 'stores/sagas/utils';
import {
  deleteRequest, getRequest, postRequest, putRequest,
} from 'utils/apiClient';

export const customerMasterUrl = 'customer/';

function* getCustomerMasterSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const response: { customers: [ICustomerMaster] } = yield call(getRequest, customerMasterUrl, {
      searcher: action.payload?.search ?? null,
    });
    yield put(getCustomerMasterSuccess(response));
    yield put({ type: CustomerMasterActionTypes.GET_CUSTOMER_MASTER_SUCCESS, customers: response });
  } catch (error: any) {
    yield put(getCustomerMasterFailure(error));
    yield put({ type: CustomerMasterActionTypes.GET_CUSTOMER_MASTER_FAILURE, error });
  }
}

function* postCustomerMasterSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePost: { customer: ICustomerMaster } = yield call(
      postRequest,
      customerMasterUrl,
      action.payload,
    );
    yield put(postCustomerMasterSuccess(responsePost));
    yield put({
      type: CustomerMasterActionTypes.POST_CUSTOMER_MASTER_SUCCESS,
      customer: responsePost,
    });
  } catch (error: any) {
    yield put(postCustomerMasterFailure(error));
    yield put({
      type: CustomerMasterActionTypes.POST_CUSTOMER_MASTER_FAILURE,
      error,
    });
  }
}

function* putCustomerMasterSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePut: { customer: ICustomerMaster } = yield call(
      putRequest,
      customerMasterUrl,
      action.payload,
      action.payload.id,
    );
    yield put(putCustomerMasterSuccess(responsePut));
    yield put({
      type: CustomerMasterActionTypes.PUT_CUSTOMER_MASTER_SUCCESS,
      customer: responsePut,
    });
  } catch (error: any) {
    yield put(putCustomerMasterFailure(error));
    yield put({
      type: CustomerMasterActionTypes.PUT_CUSTOMER_MASTER_FAILURE,
      error,
    });
  }
}

function* deleteCustomerMasterSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responseDelete: { customer: ICustomerMaster } = yield call(
      deleteRequest,
      customerMasterUrl,
      action.payload.id,
    );
    yield put(deleteCustomerMasterSuccess(responseDelete));
    yield put({
      type: CustomerMasterActionTypes.DELETE_CUSTOMER_MASTER_SUCCESS,
      customer: null,
    });
  } catch (error: any) {
    yield put(deleteCustomerMasterFailure(error));
    yield put({
      type: CustomerMasterActionTypes.DELETE_CUSTOMER_MASTER_FAILURE,
      error,
    });
  }
}

function* customerMasterSaga() {
  yield all([
    takeLatest(CustomerMasterActionTypes.GET_CUSTOMER_MASTER_REQUEST, getCustomerMasterSaga),
  ]);
  yield all([
    takeLatest(CustomerMasterActionTypes.POST_CUSTOMER_MASTER_REQUEST, postCustomerMasterSaga),
  ]);
  yield all([
    takeLatest(CustomerMasterActionTypes.PUT_CUSTOMER_MASTER_REQUEST, putCustomerMasterSaga),
  ]);
  yield all([
    takeLatest(
      CustomerMasterActionTypes.DELETE_CUSTOMER_MASTER_REQUEST,
      deleteCustomerMasterSaga,
    )]);
}

export default customerMasterSaga;
