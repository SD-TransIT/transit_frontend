import { ICustomerType } from '../../models/customerType/ICustomerType';
import CustomerTypeActionTypes from '../actions/customerType/customerTypeTypes';

export interface CustomerTypeState {
  fetchingCustomerType: boolean;
  fetchedCustomerType: boolean;
  customerTypes: ICustomerType [] | [];
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

export type CustomerTypeActions =
    | GetCustomerTypeRequest
    | GetCustomerTypeSuccess
    | GetCustomerTypeError;
