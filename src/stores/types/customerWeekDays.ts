import { ICustomerWeekDaysType } from 'models/customerWeekDays/ICustomerWeekDaysType';
import CustomerWeekDaysActionTypes from 'stores/actions/customerWeekDays/customerWeekDaysTypes';

export interface CustomerWeekDaysState {
  fetchingCustomerWeekDays: boolean;
  fetchedCustomerWeekDays: boolean;
  customerWeekDays: ICustomerWeekDaysType [] | [];
  customerWeekDay: ICustomerWeekDaysType | null;
  error: string | null;
}

export interface GetCustomerWeekDaysRequestPayload {
  payload: any;
}

export interface GetCustomerWeekDaysSuccessPayload {
  customerWeekDays: [ICustomerWeekDaysType];
}

export interface GetCustomerWeekDaysErrorPayload {
  error: string;
}

export interface PostCustomerWeekDaysRequestPayload {
  payload: { week_days: any, id: number };
}

export interface PostCustomerWeekDaysSuccessPayload {
  customerWeekDay: ICustomerWeekDaysType;
}

export interface PostCustomerWeekDaysErrorPayload {
  error: string;
}

export interface GetCustomerWeekDaysRequest {
  type: typeof CustomerWeekDaysActionTypes.GET_CUSTOMER_WEEK_DAYS_REQUEST;
  payload: GetCustomerWeekDaysRequestPayload;
}

export type GetCustomerWeekDaysSuccess = {
  type: typeof CustomerWeekDaysActionTypes.GET_CUSTOMER_WEEK_DAYS_SUCCESS;
  payload: GetCustomerWeekDaysSuccessPayload;
};

export type GetCustomerWeekDaysError = {
  type: typeof CustomerWeekDaysActionTypes.GET_CUSTOMER_WEEK_DAYS_FAILURE;
  payload: GetCustomerWeekDaysErrorPayload;
};

export interface PostCustomerWeekDaysRequest {
  type: typeof CustomerWeekDaysActionTypes.POST_CUSTOMER_WEEK_DAYS_REQUEST;
  payload: PostCustomerWeekDaysRequestPayload;
}

export type PostCustomerWeekDaysSuccess = {
  type: typeof CustomerWeekDaysActionTypes.POST_CUSTOMER_WEEK_DAYS_SUCCESS;
  payload: PostCustomerWeekDaysSuccessPayload;
};

export type PostCustomerWeekDaysError = {
  type: typeof CustomerWeekDaysActionTypes.POST_CUSTOMER_WEEK_DAYS_FAILURE;
  payload: PostCustomerWeekDaysErrorPayload;
};

export type CustomerWeekDaysActions =
    | GetCustomerWeekDaysRequest
    | GetCustomerWeekDaysSuccess
    | GetCustomerWeekDaysError
    | PostCustomerWeekDaysRequest
    | PostCustomerWeekDaysSuccess
    | PostCustomerWeekDaysError;
