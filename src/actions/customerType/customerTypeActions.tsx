import CustomerTypeActionTypes from 'actions/customerType/customerTypeTypes';
import {
  GetCustomerTypeRequest,
  GetCustomerTypeRequestPayload,
  GetCustomerTypeSuccess,
  GetCustomerTypeSuccessPayload,
  GetCustomerTypeError,
  GetCustomerTypeErrorPayload,
  PostCustomerTypeRequest,
  PostCustomerTypeRequestPayload,
  PostCustomerTypeSuccess,
  PostCustomerTypeSuccessPayload,
  PostCustomerTypeError,
  PostCustomerTypeErrorPayload,
  PutCustomerTypeRequest,
  PutCustomerTypeRequestPayload,
  PutCustomerTypeSuccess,
  PutCustomerTypeSuccessPayload,
  PutCustomerTypeError,
  PutCustomerTypeErrorPayload,
  DeleteCustomerTypeRequest,
  DeleteCustomerTypeRequestPayload,
  DeleteCustomerTypeSuccess,
  DeleteCustomerTypeSuccessPayload,
  DeleteCustomerTypeError,
  DeleteCustomerTypeErrorPayload,
} from 'types/customerType';

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

export const postCustomerTypeRequest = (
  payload: PostCustomerTypeRequestPayload,
): PostCustomerTypeRequest => ({
  type: CustomerTypeActionTypes.POST_CUSTOMER_TYPE_REQUEST,
  payload,
});

export const postCustomerTypeSuccess = (
  payload: PostCustomerTypeSuccessPayload,
): PostCustomerTypeSuccess => ({
  type: CustomerTypeActionTypes.POST_CUSTOMER_TYPE_SUCCESS,
  payload,
});

export const postCustomerTypeFailure = (
  payload: PostCustomerTypeErrorPayload,
): PostCustomerTypeError => ({
  type: CustomerTypeActionTypes.POST_CUSTOMER_TYPE_FAILURE,
  payload,
});

export const putCustomerTypeRequest = (
  payload: PutCustomerTypeRequestPayload,
): PutCustomerTypeRequest => ({
  type: CustomerTypeActionTypes.PUT_CUSTOMER_TYPE_REQUEST,
  payload,
});

export const putCustomerTypeSuccess = (
  payload: PutCustomerTypeSuccessPayload,
): PutCustomerTypeSuccess => ({
  type: CustomerTypeActionTypes.PUT_CUSTOMER_TYPE_SUCCESS,
  payload,
});

export const putCustomerTypeFailure = (
  payload: PutCustomerTypeErrorPayload,
): PutCustomerTypeError => ({
  type: CustomerTypeActionTypes.PUT_CUSTOMER_TYPE_FAILURE,
  payload,
});

export const deleteCustomerTypeRequest = (
  payload: DeleteCustomerTypeRequestPayload,
): DeleteCustomerTypeRequest => ({
  type: CustomerTypeActionTypes.DELETE_CUSTOMER_TYPE_REQUEST,
  payload,
});

export const deleteCustomerTypeSuccess = (
  payload: DeleteCustomerTypeSuccessPayload,
): DeleteCustomerTypeSuccess => ({
  type: CustomerTypeActionTypes.DELETE_CUSTOMER_TYPE_SUCCESS,
  payload,
});

export const deleteCustomerTypeFailure = (
  payload: DeleteCustomerTypeErrorPayload,
): DeleteCustomerTypeError => ({
  type: CustomerTypeActionTypes.DELETE_CUSTOMER_TYPE_FAILURE,
  payload,
});
