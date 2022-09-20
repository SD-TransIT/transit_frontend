import {
  DeleteCustomerWeekDaysError,
  DeleteCustomerWeekDaysErrorPayload,
  DeleteCustomerWeekDaysRequest,
  DeleteCustomerWeekDaysRequestPayload,
  DeleteCustomerWeekDaysSuccess,
  DeleteCustomerWeekDaysSuccessPayload,
  GetCustomerWeekDaysError,
  GetCustomerWeekDaysErrorPayload,
  GetCustomerWeekDaysRequest,
  GetCustomerWeekDaysRequestPayload,
  GetCustomerWeekDaysSuccess,
  GetCustomerWeekDaysSuccessPayload,
  PostCustomerWeekDaysError,
  PostCustomerWeekDaysErrorPayload,
  PostCustomerWeekDaysRequest,
  PostCustomerWeekDaysRequestPayload,
  PostCustomerWeekDaysSuccess,
  PostCustomerWeekDaysSuccessPayload,
  PutCustomerWeekDaysError,
  PutCustomerWeekDaysErrorPayload,
  PutCustomerWeekDaysRequest,
  PutCustomerWeekDaysRequestPayload,
  PutCustomerWeekDaysSuccess,
  PutCustomerWeekDaysSuccessPayload,
} from 'stores/types/customerWeekDays';

import CustomerWeekDaysActionTypes from './customerWeekDaysTypes';

export const getCustomerWeekDaysRequest = (
  payload: GetCustomerWeekDaysRequestPayload,
): GetCustomerWeekDaysRequest => ({
  type: CustomerWeekDaysActionTypes.GET_CUSTOMER_WEEK_DAYS_REQUEST,
  payload,
});

export const getCustomerWeekDaysSuccess = (
  payload: GetCustomerWeekDaysSuccessPayload,
): GetCustomerWeekDaysSuccess => ({
  type: CustomerWeekDaysActionTypes.GET_CUSTOMER_WEEK_DAYS_SUCCESS,
  payload,
});

export const getCustomerWeekDaysFailure = (
  payload: GetCustomerWeekDaysErrorPayload,
): GetCustomerWeekDaysError => ({
  type: CustomerWeekDaysActionTypes.GET_CUSTOMER_WEEK_DAYS_FAILURE,
  payload,
});

export const postCustomerWeekDaysRequest = (
  payload: PostCustomerWeekDaysRequestPayload,
): PostCustomerWeekDaysRequest => ({
  type: CustomerWeekDaysActionTypes.POST_CUSTOMER_WEEK_DAYS_REQUEST,
  payload,
});

export const postCustomerWeekDaysSuccess = (
  payload: PostCustomerWeekDaysSuccessPayload,
): PostCustomerWeekDaysSuccess => ({
  type: CustomerWeekDaysActionTypes.POST_CUSTOMER_WEEK_DAYS_SUCCESS,
  payload,
});

export const postCustomerWeekDaysFailure = (
  payload: PostCustomerWeekDaysErrorPayload,
): PostCustomerWeekDaysError => ({
  type: CustomerWeekDaysActionTypes.POST_CUSTOMER_WEEK_DAYS_FAILURE,
  payload,
});

export const putCustomerWeekDaysRequest = (
  payload: PutCustomerWeekDaysRequestPayload,
): PutCustomerWeekDaysRequest => ({
  type: CustomerWeekDaysActionTypes.PUT_CUSTOMER_WEEK_DAYS_REQUEST,
  payload,
});

export const putCustomerWeekDaysSuccess = (
  payload: PutCustomerWeekDaysSuccessPayload,
): PutCustomerWeekDaysSuccess => ({
  type: CustomerWeekDaysActionTypes.PUT_CUSTOMER_WEEK_DAYS_SUCCESS,
  payload,
});

export const putCustomerWeekDaysFailure = (
  payload: PutCustomerWeekDaysErrorPayload,
): PutCustomerWeekDaysError => ({
  type: CustomerWeekDaysActionTypes.PUT_CUSTOMER_WEEK_DAYS_FAILURE,
  payload,
});

export const deleteCustomerWeekDaysRequest = (
  payload: DeleteCustomerWeekDaysRequestPayload,
): DeleteCustomerWeekDaysRequest => ({
  type: CustomerWeekDaysActionTypes.DELETE_CUSTOMER_WEEK_DAYS_REQUEST,
  payload,
});

export const deleteCustomerWeekDaysSuccess = (
  payload: DeleteCustomerWeekDaysSuccessPayload,
): DeleteCustomerWeekDaysSuccess => ({
  type: CustomerWeekDaysActionTypes.DELETE_CUSTOMER_WEEK_DAYS_SUCCESS,
  payload,
});

export const deleteCustomerWeekDaysFailure = (
  payload: DeleteCustomerWeekDaysErrorPayload,
): DeleteCustomerWeekDaysError => ({
  type: CustomerWeekDaysActionTypes.DELETE_CUSTOMER_WEEK_DAYS_FAILURE,
  payload,
});
