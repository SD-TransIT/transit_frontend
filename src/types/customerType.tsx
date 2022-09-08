import { ICustomerType } from 'models/customerType/ICustomerType';

import CustomerTypeActionTypes from 'actions/customerType/customerTypeTypes';

export interface CustomerTypeState {
  fetchingCustomerType: boolean;
  fetchedCustomerType: boolean;
  customerTypes: ICustomerType [] | [];
  customerType: ICustomerType | null;
  error: string | null;
}

export interface GetCustomerTypeRequestPayload {
  payload: any;
}

export interface GetCustomerTypeSuccessPayload {
  customerTypes: [ICustomerType];
}

export interface GetCustomerTypeErrorPayload {
  error: string;
}

export interface PostCustomerTypeRequestPayload {
  payload: ICustomerType;
}

export interface PostCustomerTypeSuccessPayload {
  customerType: ICustomerType;
}

export interface PostCustomerTypeErrorPayload {
  error: string;
}

export interface PutCustomerTypeRequestPayload {
  payload: ICustomerType;
}

export interface PutCustomerTypeSuccessPayload {
  customerType: ICustomerType;
}

export interface PutCustomerTypeErrorPayload {
  error: string;
}

export interface DeleteCustomerTypeRequestPayload {
  payload: ICustomerType;
}

export interface DeleteCustomerTypeSuccessPayload {
}

export interface DeleteCustomerTypeErrorPayload {
  error: string;
}

export interface GetCustomerTypeRequest {
  type: typeof CustomerTypeActionTypes.GET_CUSTOMER_TYPE_REQUEST;
  payload: GetCustomerTypeRequestPayload;
}

export type GetCustomerTypeSuccess = {
  type: typeof CustomerTypeActionTypes.GET_CUSTOMER_TYPE_SUCCESS;
  payload: GetCustomerTypeSuccessPayload;
};

export type GetCustomerTypeError = {
  type: typeof CustomerTypeActionTypes.GET_CUSTOMER_TYPE_FAILURE;
  payload: GetCustomerTypeErrorPayload;
};

export interface PostCustomerTypeRequest {
  type: typeof CustomerTypeActionTypes.POST_CUSTOMER_TYPE_REQUEST;
  payload: PostCustomerTypeRequestPayload;
}

export type PostCustomerTypeSuccess = {
  type: typeof CustomerTypeActionTypes.POST_CUSTOMER_TYPE_SUCCESS;
  payload: PostCustomerTypeSuccessPayload;
};

export type PostCustomerTypeError = {
  type: typeof CustomerTypeActionTypes.POST_CUSTOMER_TYPE_FAILURE;
  payload: PostCustomerTypeErrorPayload;
};

export interface PutCustomerTypeRequest {
  type: typeof CustomerTypeActionTypes.PUT_CUSTOMER_TYPE_REQUEST;
  payload: PutCustomerTypeRequestPayload;
}

export type PutCustomerTypeSuccess = {
  type: typeof CustomerTypeActionTypes.PUT_CUSTOMER_TYPE_SUCCESS;
  payload: PutCustomerTypeSuccessPayload;
};

export type PutCustomerTypeError = {
  type: typeof CustomerTypeActionTypes.PUT_CUSTOMER_TYPE_FAILURE;
  payload: PutCustomerTypeErrorPayload;
};

export interface DeleteCustomerTypeRequest {
  type: typeof CustomerTypeActionTypes.DELETE_CUSTOMER_TYPE_REQUEST;
  payload: DeleteCustomerTypeRequestPayload;
}

export type DeleteCustomerTypeSuccess = {
  type: typeof CustomerTypeActionTypes.DELETE_CUSTOMER_TYPE_SUCCESS;
  payload: DeleteCustomerTypeSuccessPayload;
};

export type DeleteCustomerTypeError = {
  type: typeof CustomerTypeActionTypes.DELETE_CUSTOMER_TYPE_FAILURE;
  payload: DeleteCustomerTypeErrorPayload;
};

export type CustomerTypeActions =
    | GetCustomerTypeRequest
    | GetCustomerTypeSuccess
    | GetCustomerTypeError
    | PostCustomerTypeRequest
    | PostCustomerTypeSuccess
    | PostCustomerTypeError
    | PutCustomerTypeRequest
    | PutCustomerTypeSuccess
    | PutCustomerTypeError
    | DeleteCustomerTypeRequest
    | DeleteCustomerTypeSuccess
    | DeleteCustomerTypeError;
