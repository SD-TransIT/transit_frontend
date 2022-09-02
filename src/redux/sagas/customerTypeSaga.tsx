import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';
import apiClient from '../../utils/apiClient';
import { sessionToken } from '../reducers/tokenReducer';
import {
  getCustomerTypeSuccess, getCustomerTypeFailure,
  postCustomerTypeSuccess, postCustomerTypeFailure,
  putCustomerTypeSuccess, putCustomerTypeFailure,
  deleteCustomerTypeSuccess, deleteCustomerTypeFailure,
} from '../actions/customerType/customerTypeActions';
import { ICustomerType } from '../../models/customerType/ICustomerType';
import CustomerTypeActionTypes from '../actions/customerType/customerTypeTypes';
import refreshAccessToken from './utils';

const getCustomerType = async (parameters: any) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const additionalParamString = parameters.searcher !== null ? `?search=${parameters.searcher}` : '';
  const { data } = await apiClient.get(
    `customer_type/${additionalParamString}`,
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
    'customer_type/',
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
    `customer_type/${id}/`,
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
    `customer_type/${id}/`,
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
