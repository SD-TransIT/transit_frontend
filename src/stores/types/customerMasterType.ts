import { ICustomerMaster } from 'models/customerMaster/ICustomerMaster';
import CustomerMasterActionTypes from 'stores/actions/customerMaster/customerMasterTypes';

export interface CustomerMasterState {
  fetchingCustomerMaster: boolean;
  fetchedCustomerMaster: boolean;
  customers: ICustomerMaster [] | [];
  customer: ICustomerMaster | null;
  error: string | null;
}

export interface GetCustomerMasterRequestPayload {
  payload: any;
}

export interface GetCustomerMasterSuccessPayload {
  customers: [ICustomerMaster];
}

export interface GetCustomerMasterErrorPayload {
  error: string;
}

export interface PostCustomerMasterRequestPayload {
  payload: ICustomerMaster;
}

export interface PostCustomerMasterSuccessPayload {
  customer: ICustomerMaster;
}

export interface PostCustomerMasterErrorPayload {
  error: string;
}

export interface PutCustomerMasterRequestPayload {
  payload: ICustomerMaster;
}

export interface PutCustomerMasterSuccessPayload {
  customer: ICustomerMaster;
}

export interface PutCustomerMasterErrorPayload {
  error: string;
}

export interface DeleteCustomerMasterRequestPayload {
  payload: ICustomerMaster;
}

export interface DeleteCustomerMasterSuccessPayload {
}

export interface DeleteCustomerMasterErrorPayload {
  error: string;
}

export interface GetCustomerMasterRequest {
  type: typeof CustomerMasterActionTypes.GET_CUSTOMER_MASTER_REQUEST;
  payload: GetCustomerMasterRequestPayload;
}

export type GetCustomerMasterSuccess = {
  type: typeof CustomerMasterActionTypes.GET_CUSTOMER_MASTER_SUCCESS;
  payload: GetCustomerMasterSuccessPayload;
};

export type GetCustomerMasterError = {
  type: typeof CustomerMasterActionTypes.GET_CUSTOMER_MASTER_FAILURE;
  payload: GetCustomerMasterErrorPayload;
};

export interface PostCustomerMasterRequest {
  type: typeof CustomerMasterActionTypes.POST_CUSTOMER_MASTER_REQUEST;
  payload: PostCustomerMasterRequestPayload;
}

export type PostCustomerMasterSuccess = {
  type: typeof CustomerMasterActionTypes.POST_CUSTOMER_MASTER_SUCCESS;
  payload: PostCustomerMasterSuccessPayload;
};

export type PostCustomerMasterError = {
  type: typeof CustomerMasterActionTypes.POST_CUSTOMER_MASTER_FAILURE;
  payload: PostCustomerMasterErrorPayload;
};

export interface PutCustomerMasterRequest {
  type: typeof CustomerMasterActionTypes.PUT_CUSTOMER_MASTER_REQUEST;
  payload: PutCustomerMasterRequestPayload;
}

export type PutCustomerMasterSuccess = {
  type: typeof CustomerMasterActionTypes.PUT_CUSTOMER_MASTER_SUCCESS;
  payload: PutCustomerMasterSuccessPayload;
};

export type PutCustomerMasterError = {
  type: typeof CustomerMasterActionTypes.PUT_CUSTOMER_MASTER_FAILURE;
  payload: PutCustomerMasterErrorPayload;
};

export interface DeleteCustomerMasterRequest {
  type: typeof CustomerMasterActionTypes.DELETE_CUSTOMER_MASTER_REQUEST;
  payload: DeleteCustomerMasterRequestPayload;
}

export type DeleteCustomerMasterSuccess = {
  type: typeof CustomerMasterActionTypes.DELETE_CUSTOMER_MASTER_SUCCESS;
  payload: DeleteCustomerMasterSuccessPayload;
};

export type DeleteCustomerMasterError = {
  type: typeof CustomerMasterActionTypes.DELETE_CUSTOMER_MASTER_FAILURE;
  payload: DeleteCustomerMasterErrorPayload;
};

export type CustomerMasterActions =
    | GetCustomerMasterRequest
    | GetCustomerMasterSuccess
    | GetCustomerMasterError
    | PostCustomerMasterRequest
    | PostCustomerMasterSuccess
    | PostCustomerMasterError
    | PutCustomerMasterRequest
    | PutCustomerMasterSuccess
    | PutCustomerMasterError
    | DeleteCustomerMasterRequest
    | DeleteCustomerMasterSuccess
    | DeleteCustomerMasterError;
