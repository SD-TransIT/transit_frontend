import {
  DeleteCustomerMasterError,
  DeleteCustomerMasterErrorPayload,
  DeleteCustomerMasterRequest,
  DeleteCustomerMasterRequestPayload,
  DeleteCustomerMasterSuccess,
  DeleteCustomerMasterSuccessPayload,
  GetCustomerMasterError,
  GetCustomerMasterErrorPayload,
  GetCustomerMasterRequest,
  GetCustomerMasterRequestPayload,
  GetCustomerMasterSuccess,
  GetCustomerMasterSuccessPayload,
  PostCustomerMasterError,
  PostCustomerMasterErrorPayload,
  PostCustomerMasterRequest,
  PostCustomerMasterRequestPayload,
  PostCustomerMasterSuccess,
  PostCustomerMasterSuccessPayload,
  PutCustomerMasterError,
  PutCustomerMasterErrorPayload,
  PutCustomerMasterRequest,
  PutCustomerMasterRequestPayload,
  PutCustomerMasterSuccess,
  PutCustomerMasterSuccessPayload,
} from 'stores/types/customerMasterType';

import CustomerMasterActionTypes from './customerMasterTypes';

export const getCustomerMasterRequest = (
  payload: GetCustomerMasterRequestPayload,
): GetCustomerMasterRequest => ({
  type: CustomerMasterActionTypes.GET_CUSTOMER_MASTER_REQUEST,
  payload,
});

export const getCustomerMasterSuccess = (
  payload: GetCustomerMasterSuccessPayload,
): GetCustomerMasterSuccess => ({
  type: CustomerMasterActionTypes.GET_CUSTOMER_MASTER_SUCCESS,
  payload,
});

export const getCustomerMasterFailure = (
  payload: GetCustomerMasterErrorPayload,
): GetCustomerMasterError => ({
  type: CustomerMasterActionTypes.GET_CUSTOMER_MASTER_FAILURE,
  payload,
});

export const postCustomerMasterRequest = (
  payload: PostCustomerMasterRequestPayload,
): PostCustomerMasterRequest => ({
  type: CustomerMasterActionTypes.POST_CUSTOMER_MASTER_REQUEST,
  payload,
});

export const postCustomerMasterSuccess = (
  payload: PostCustomerMasterSuccessPayload,
): PostCustomerMasterSuccess => ({
  type: CustomerMasterActionTypes.POST_CUSTOMER_MASTER_SUCCESS,
  payload,
});

export const postCustomerMasterFailure = (
  payload: PostCustomerMasterErrorPayload,
): PostCustomerMasterError => ({
  type: CustomerMasterActionTypes.POST_CUSTOMER_MASTER_FAILURE,
  payload,
});

export const putCustomerMasterRequest = (
  payload: PutCustomerMasterRequestPayload,
): PutCustomerMasterRequest => ({
  type: CustomerMasterActionTypes.PUT_CUSTOMER_MASTER_REQUEST,
  payload,
});

export const putCustomerMasterSuccess = (
  payload: PutCustomerMasterSuccessPayload,
): PutCustomerMasterSuccess => ({
  type: CustomerMasterActionTypes.PUT_CUSTOMER_MASTER_SUCCESS,
  payload,
});

export const putCustomerMasterFailure = (
  payload: PutCustomerMasterErrorPayload,
): PutCustomerMasterError => ({
  type: CustomerMasterActionTypes.PUT_CUSTOMER_MASTER_FAILURE,
  payload,
});

export const deleteCustomerTypeRequest = (
  payload: DeleteCustomerMasterRequestPayload,
): DeleteCustomerMasterRequest => ({
  type: CustomerMasterActionTypes.DELETE_CUSTOMER_MASTER_REQUEST,
  payload,
});

export const deleteCustomerMasterSuccess = (
  payload: DeleteCustomerMasterSuccessPayload,
): DeleteCustomerMasterSuccess => ({
  type: CustomerMasterActionTypes.DELETE_CUSTOMER_MASTER_SUCCESS,
  payload,
});

export const deleteCustomerMasterFailure = (
  payload: DeleteCustomerMasterErrorPayload,
): DeleteCustomerMasterError => ({
  type: CustomerMasterActionTypes.DELETE_CUSTOMER_MASTER_FAILURE,
  payload,
});
