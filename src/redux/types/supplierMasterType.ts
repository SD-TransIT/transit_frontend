import { ISupplierMaster } from '../../models/supplierMaster/ISupplierMasterType';
import SupplierMasterActionTypes from '../actions/supplierMaster/supplierMasterTypes';

export interface SupplierMasterState {
  fetchingSupplierMaster: boolean;
  fetchedSupplierMaster: boolean;
  supplierMasters: ISupplierMaster [] | [];
  supplierMaster: ISupplierMaster | null;
  error: string | null;
}

export interface GetSupplierMasterRequestPayload {
  payload: any;
}

export interface GetSupplierMasterSuccessPayload {
  supplierMasters: [ISupplierMaster];
}

export interface GetSupplierMasterErrorPayload {
  error: string;
}

export interface PostSupplierMasterRequestPayload {
  payload: ISupplierMaster;
}

export interface PostSupplierMasterSuccessPayload {
  supplierMaster: ISupplierMaster;
}

export interface PostSupplierMasterErrorPayload {
  error: string;
}

export interface PutSupplierMasterRequestPayload {
  payload: ISupplierMaster;
}

export interface PutSupplierMasterSuccessPayload {
  supplierMaster: ISupplierMaster;
}

export interface PutSupplierMasterErrorPayload {
  error: string;
}

export interface GetSupplierMasterRequest {
  type: typeof SupplierMasterActionTypes.GET_SUPPLIER_MASTER_REQUEST;
  payload: GetSupplierMasterRequestPayload;
}

export type GetSupplierMasterSuccess = {
  type: typeof SupplierMasterActionTypes.GET_SUPPLIER_MASTER_SUCCESS;
  payload: GetSupplierMasterSuccessPayload;
};

export type GetSupplierMasterError = {
  type: typeof SupplierMasterActionTypes.GET_SUPPLIER_MASTER_FAILURE;
  payload: GetSupplierMasterErrorPayload;
};

export interface PostSupplierMasterRequest {
  type: typeof SupplierMasterActionTypes.POST_SUPPLIER_MASTER_REQUEST;
  payload: PostSupplierMasterRequestPayload;
}

export type PostSupplierMasterSuccess = {
  type: typeof SupplierMasterActionTypes.POST_SUPPLIER_MASTER_SUCCESS;
  payload: PostSupplierMasterSuccessPayload;
};

export type PostSupplierMasterError = {
  type: typeof SupplierMasterActionTypes.POST_SUPPLIER_MASTER_FAILURE;
  payload: PostSupplierMasterErrorPayload;
};

export interface PutSupplierMasterRequest {
  type: typeof SupplierMasterActionTypes.PUT_SUPPLIER_MASTER_REQUEST;
  payload: PutSupplierMasterRequestPayload;
}

export type PutSupplierMasterSuccess = {
  type: typeof SupplierMasterActionTypes.PUT_SUPPLIER_MASTER_SUCCESS;
  payload: PutSupplierMasterSuccessPayload;
};

export type PutSupplierMasterError = {
  type: typeof SupplierMasterActionTypes.PUT_SUPPLIER_MASTER_FAILURE;
  payload: PutSupplierMasterErrorPayload;
};

export type SupplierMasterActions =
    | GetSupplierMasterRequest
    | GetSupplierMasterSuccess
    | GetSupplierMasterError
    | PostSupplierMasterRequest
    | PostSupplierMasterSuccess
    | PostSupplierMasterError
    | PutSupplierMasterRequest
    | PutSupplierMasterSuccess
    | PutSupplierMasterError;
