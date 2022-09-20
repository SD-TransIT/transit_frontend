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
  payload: ICustomerWeekDaysType;
}

export interface PostCustomerWeekDaysSuccessPayload {
  customerWeekDay: ICustomerWeekDaysType;
}

export interface PostCustomerWeekDaysErrorPayload {
  error: string;
}

export interface PutCustomerWeekDaysRequestPayload {
  payload: ICustomerWeekDaysType;
}

export interface PutCustomerWeekDaysSuccessPayload {
  customerWeekDay: ICustomerWeekDaysType;
}

export interface PutCustomerWeekDaysErrorPayload {
  error: string;
}

export interface DeleteCustomerWeekDaysRequestPayload {
  payload: ICustomerWeekDaysType;
}

export interface DeleteCustomerWeekDaysSuccessPayload {
}

export interface DeleteCustomerWeekDaysErrorPayload {
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

export interface PutCustomerWeekDaysRequest {
  type: typeof CustomerWeekDaysActionTypes.PUT_CUSTOMER_WEEK_DAYS_REQUEST;
  payload: PutCustomerWeekDaysRequestPayload;
}

export type PutCustomerWeekDaysSuccess = {
  type: typeof CustomerWeekDaysActionTypes.PUT_CUSTOMER_WEEK_DAYS_SUCCESS;
  payload: PutCustomerWeekDaysSuccessPayload;
};

export type PutCustomerWeekDaysError = {
  type: typeof CustomerWeekDaysActionTypes.PUT_CUSTOMER_WEEK_DAYS_FAILURE;
  payload: PutCustomerWeekDaysErrorPayload;
};

export interface DeleteCustomerWeekDaysRequest {
  type: typeof CustomerWeekDaysActionTypes.DELETE_CUSTOMER_WEEK_DAYS_REQUEST;
  payload: DeleteCustomerWeekDaysRequestPayload;
}

export type DeleteCustomerWeekDaysSuccess = {
  type: typeof CustomerWeekDaysActionTypes.DELETE_CUSTOMER_WEEK_DAYS_SUCCESS;
  payload: DeleteCustomerWeekDaysSuccessPayload;
};

export type DeleteCustomerWeekDaysError = {
  type: typeof CustomerWeekDaysActionTypes.DELETE_CUSTOMER_WEEK_DAYS_FAILURE;
  payload: DeleteCustomerWeekDaysErrorPayload;
};

export type CustomerWeekDaysActions =
    | GetCustomerWeekDaysRequest
    | GetCustomerWeekDaysSuccess
    | GetCustomerWeekDaysError
    | PostCustomerWeekDaysRequest
    | PostCustomerWeekDaysSuccess
    | PostCustomerWeekDaysError
    | PutCustomerWeekDaysRequest
    | PutCustomerWeekDaysSuccess
    | PutCustomerWeekDaysError
    | DeleteCustomerWeekDaysRequest
    | DeleteCustomerWeekDaysSuccess
    | DeleteCustomerWeekDaysError;
