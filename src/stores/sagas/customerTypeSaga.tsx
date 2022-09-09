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
import { sessionToken } from 'stores/reducers/tokenReducer';
import refreshAccessToken from 'stores/sagas/utils';
import apiClient from 'utils/apiClient';

const customerTypeUrl = 'customer_type/';

const getCustomerType = async (parameters: any) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const additionalParamString = parameters.searcher !== null ? `?search=${parameters.searcher}` : '';
  const { data } = await apiClient.get(
    `${customerTypeUrl}${additionalParamString}`,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return Object.prototype.hasOwnProperty.call(data, 'results') ? data.results : data;
};

const postCustomerType = async (payload: ICustomerType) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const { data } = await apiClient.post(
    customerTypeUrl,
    { customer_type_name: payload.customer_type_name },
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};

const putCustomerType = async (payload: ICustomerType, id: number) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const { data } = await apiClient.put(
    `${customerTypeUrl}${id}/`,
    { customer_type_name: payload.customer_type_name },
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};

const deleteCustomerType = async (id: number) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const { data } = await apiClient.delete(
    `${customerTypeUrl}${id}/`,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};

function* getCustomerTypeSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const response: { customerTypes: [ICustomerType] } = yield call(getCustomerType, {
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
    const responsePost: { customerType: ICustomerType } = yield call(postCustomerType, {
      customer_type_name: action.payload.customerTypeName,
    });
    const responseGet: { customerType: ICustomerType } = yield call(getCustomerType, {
      searcher: action.payload?.search ?? null,
    });
    yield put(postCustomerTypeSuccess(responsePost));
    yield put({
      type: CustomerTypeActionTypes.POST_CUSTOMER_TYPE_SUCCESS,
      customerType: responsePost,
      customerTypes: responseGet,
    });
  } catch (error: any) {
    const responseGet: { customerType: ICustomerType } = yield call(getCustomerType, {
      searcher: action.payload?.search ?? null,
    });
    yield put(postCustomerTypeFailure(error));
    yield put({
      type: CustomerTypeActionTypes.POST_CUSTOMER_TYPE_FAILURE,
      customerTypes: responseGet,
      error,
    });
  }
}

function* putCustomerTypeSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responsePut: { customerType: ICustomerType } = yield call(putCustomerType, {
      customer_type_name: action.payload.customerTypeName,
    }, action.payload.id);
    const responseGet: { customerType: ICustomerType } = yield call(getCustomerType, {
      searcher: action.payload?.search ?? null,
    });
    yield put(putCustomerTypeSuccess(responsePut));
    yield put({
      type: CustomerTypeActionTypes.PUT_CUSTOMER_TYPE_SUCCESS,
      customerType: responsePut,
      customerTypes: responseGet,
    });
  } catch (error: any) {
    const responseGet: { customerType: ICustomerType } = yield call(getCustomerType, {
      searcher: action.payload?.search ?? null,
    });
    yield put(putCustomerTypeFailure(error));
    yield put({
      type: CustomerTypeActionTypes.PUT_CUSTOMER_TYPE_FAILURE,
      customerTypes: responseGet,
      error,
    });
  }
}

function* deleteCustomerTypeSaga(action: any) {
  try {
    yield call(refreshAccessToken);
    const responseDelete: { customerType: ICustomerType } = yield call(
      deleteCustomerType,
      action.payload.id,
    );
    const responseGet: { customerType: ICustomerType } = yield call(getCustomerType, {
      searcher: action.payload?.search ?? null,
    });
    yield put(deleteCustomerTypeSuccess(responseDelete));
    yield put({
      type: CustomerTypeActionTypes.DELETE_CUSTOMER_TYPE_SUCCESS,
      customerTypes: responseGet,
    });
  } catch (error: any) {
    const responseGet: { customerType: ICustomerType } = yield call(getCustomerType, {
      searcher: action.payload?.search ?? null,
    });
    yield put(deleteCustomerTypeFailure(error));
    yield put({
      type: CustomerTypeActionTypes.DELETE_CUSTOMER_TYPE_FAILURE,
      customerTypes: responseGet,
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
