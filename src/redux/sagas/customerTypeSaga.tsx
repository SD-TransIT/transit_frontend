import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';
import apiClient from '../../utils/apiClient';
import { sessionToken } from '../reducers/tokenReducer';
import { getCustomerTypeSuccess, getCustomerTypeFailure } from '../actions/customerType/customerTypeActions';
import { ICustomerType } from '../../models/customerType/ICustomerType';
import isAuthenticated from '../../utils/authHelper';
import { IToken } from '../../models/token/IToken';
import CustomerTypeActionTypes from '../actions/customerType/customerTypeTypes';
import { refreshToken } from './tokenSaga';

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

function* getCustomerTypeSaga(action: any) {
  try {
    if (isAuthenticated() === false) {
      const { refresh } = JSON.parse(localStorage.getItem(sessionToken) as string);
      const responseRefresh: { token: IToken } = yield call(refreshToken, {
        refresh,
      });
      localStorage.setItem(sessionToken, JSON.stringify(responseRefresh));
    }
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

function* customerTypeSaga() {
  yield all([takeLatest(CustomerTypeActionTypes.GET_CUSTOMER_TYPE_REQUEST, getCustomerTypeSaga)]);
}

export default customerTypeSaga;
