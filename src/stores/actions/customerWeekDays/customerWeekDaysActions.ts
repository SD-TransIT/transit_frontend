import {
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
