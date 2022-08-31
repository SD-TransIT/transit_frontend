import CustomerTypeActionTypes from './customerTypeTypes';
import {
  GetCustomerTypeRequest,
  GetCustomerTypeRequestPayload,
  GetCustomerTypeSuccess,
  GetCustomerTypeSuccessPayload,
  GetCustomerTypeError,
  GetCustomerTypeErrorPayload,
} from '../../types/customerType';

export const getCustomerTypeRequest = (
  payload: GetCustomerTypeRequestPayload,
): GetCustomerTypeRequest => ({
  type: CustomerTypeActionTypes.GET_CUSTOMER_TYPE_REQUEST,
  payload,
});

export const getCustomerTypeSuccess = (
  payload: GetCustomerTypeSuccessPayload,
): GetCustomerTypeSuccess => ({
  type: CustomerTypeActionTypes.GET_CUSTOMER_TYPE_SUCCESS,
  payload,
});

export const getCustomerTypeFailure = (
  payload: GetCustomerTypeErrorPayload,
): GetCustomerTypeError => ({
  type: CustomerTypeActionTypes.GET_CUSTOMER_TYPE_FAILURE,
  payload,
});
