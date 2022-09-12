import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import { ICustomerType } from 'models/customerType/ICustomerType';
import {
  deleteCustomerTypeFailure,
  deleteCustomerTypeSuccess, getCustomerTypeFailure,
  getCustomerTypeSuccess, postCustomerTypeFailure,
  postCustomerTypeSuccess, putCustomerTypeFailure,
  putCustomerTypeSuccess,
} from 'stores/actions/customerType/customerTypeActions';
import CustomerTypeActionTypes from 'stores/actions/customerType/customerTypeTypes';
import refreshAccessToken from 'stores/sagas/utils';
import {
  deleteRequest, getRequest, postRequest, putRequest,
} from 'utils/apiClient';

export const customerTypeUrl = 'customer_type/';

function* getCustomerTypeSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const response: { customerTypes: [ICustomerType] } = yield call(getRequest, customerTypeUrl, {
      searcher: action.payload?.search ?? null,
    });
    yield put(getCustomerTypeSuccess(response));
    yield put({ type: CustomerTypeActionTypes.GET_CUSTOMER_TYPE_SUCCESS, customerTypes: response });
  } catch (error: any) {
    yield put(getCustomerTypeFailure(error));
    yield put({ type: CustomerTypeActionTypes.GET_CUSTOMER_TYPE_FAILURE, error });
  }
}

function* postCustomerTypeSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePost: { customerType: ICustomerType } = yield call(
      postRequest,
      customerTypeUrl,
      action.payload,
    );
    yield put(postCustomerTypeSuccess(responsePost));
    yield put({
      type: CustomerTypeActionTypes.POST_CUSTOMER_TYPE_SUCCESS,
      customerType: responsePost,
    });
  } catch (error: any) {
    yield put(postCustomerTypeFailure(error));
    yield put({
      type: CustomerTypeActionTypes.POST_CUSTOMER_TYPE_FAILURE,
      error,
    });
  }
}

function* putCustomerTypeSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePut: { customerType: ICustomerType } = yield call(
      putRequest,
      customerTypeUrl,
      action.payload,
      action.payload.id,
    );
    yield put(putCustomerTypeSuccess(responsePut));
    yield put({
      type: CustomerTypeActionTypes.PUT_CUSTOMER_TYPE_SUCCESS,
      customerType: responsePut,
    });
  } catch (error: any) {
    yield put(putCustomerTypeFailure(error));
    yield put({
      type: CustomerTypeActionTypes.PUT_CUSTOMER_TYPE_FAILURE,
      error,
    });
  }
}

function* deleteCustomerTypeSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responseDelete: { customerType: ICustomerType } = yield call(
      deleteRequest,
      customerTypeUrl,
      action.payload.id,
    );
    yield put(deleteCustomerTypeSuccess(responseDelete));
    yield put({
      type: CustomerTypeActionTypes.DELETE_CUSTOMER_TYPE_SUCCESS,
      customerType: null,
    });
  } catch (error: any) {
    yield put(deleteCustomerTypeFailure(error));
    yield put({
      type: CustomerTypeActionTypes.DELETE_CUSTOMER_TYPE_FAILURE,
      error,
    });
  }
}

function* customerTypeSaga() {
  yield all([takeLatest(CustomerTypeActionTypes.GET_CUSTOMER_TYPE_REQUEST, getCustomerTypeSaga)]);
  yield all([takeLatest(CustomerTypeActionTypes.POST_CUSTOMER_TYPE_REQUEST, postCustomerTypeSaga)]);
  yield all([takeLatest(CustomerTypeActionTypes.PUT_CUSTOMER_TYPE_REQUEST, putCustomerTypeSaga)]);
  yield all([takeLatest(
    CustomerTypeActionTypes.DELETE_CUSTOMER_TYPE_REQUEST,
    deleteCustomerTypeSaga,
  )]);
}

export default customerTypeSaga;
