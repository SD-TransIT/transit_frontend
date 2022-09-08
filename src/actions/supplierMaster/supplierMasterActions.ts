import {
  DeleteSupplierMasterError,
  DeleteSupplierMasterErrorPayload,
  DeleteSupplierMasterRequest,
  DeleteSupplierMasterRequestPayload,
  DeleteSupplierMasterSuccess,
  DeleteSupplierMasterSuccessPayload,
  GetSupplierMasterError,
  GetSupplierMasterErrorPayload,
  GetSupplierMasterRequest,
  GetSupplierMasterRequestPayload,
  GetSupplierMasterSuccess,
  GetSupplierMasterSuccessPayload,
  PostSupplierMasterError,
  PostSupplierMasterErrorPayload,
  PostSupplierMasterRequest,
  PostSupplierMasterRequestPayload,
  PostSupplierMasterSuccess,
  PostSupplierMasterSuccessPayload,
  PutSupplierMasterError,
  PutSupplierMasterErrorPayload,
  PutSupplierMasterRequest,
  PutSupplierMasterRequestPayload,
  PutSupplierMasterSuccess,
  PutSupplierMasterSuccessPayload,
} from 'types/supplierMasterType';

import SupplierMasterActionTypes from 'actions/supplierMaster/supplierMasterTypes';

export const getSupplierMasterRequest = (
  payload: GetSupplierMasterRequestPayload,
): GetSupplierMasterRequest => ({
  type: SupplierMasterActionTypes.GET_SUPPLIER_MASTER_REQUEST,
  payload,
});

export const getSupplierMasterSuccess = (
  payload: GetSupplierMasterSuccessPayload,
): GetSupplierMasterSuccess => ({
  type: SupplierMasterActionTypes.GET_SUPPLIER_MASTER_SUCCESS,
  payload,
});

export const getSupplierMasterFailure = (
  payload: GetSupplierMasterErrorPayload,
): GetSupplierMasterError => ({
  type: SupplierMasterActionTypes.GET_SUPPLIER_MASTER_FAILURE,
  payload,
});

export const postSupplierMasterRequest = (
  payload: PostSupplierMasterRequestPayload,
): PostSupplierMasterRequest => ({
  type: SupplierMasterActionTypes.POST_SUPPLIER_MASTER_REQUEST,
  payload,
});

export const postSupplierMasterSuccess = (
  payload: PostSupplierMasterSuccessPayload,
): PostSupplierMasterSuccess => ({
  type: SupplierMasterActionTypes.POST_SUPPLIER_MASTER_SUCCESS,
  payload,
});

export const postSupplierMasterFailure = (
  payload: PostSupplierMasterErrorPayload,
): PostSupplierMasterError => ({
  type: SupplierMasterActionTypes.POST_SUPPLIER_MASTER_FAILURE,
  payload,
});

export const putSupplierMasterRequest = (
  payload: PutSupplierMasterRequestPayload,
): PutSupplierMasterRequest => ({
  type: SupplierMasterActionTypes.PUT_SUPPLIER_MASTER_REQUEST,
  payload,
});

export const putSupplierMasterSuccess = (
  payload: PutSupplierMasterSuccessPayload,
): PutSupplierMasterSuccess => ({
  type: SupplierMasterActionTypes.PUT_SUPPLIER_MASTER_SUCCESS,
  payload,
});

export const putSupplierMasterFailure = (
  payload: PutSupplierMasterErrorPayload,
): PutSupplierMasterError => ({
  type: SupplierMasterActionTypes.PUT_SUPPLIER_MASTER_FAILURE,
  payload,
});

export const deleteSupplierMasterRequest = (
  payload: DeleteSupplierMasterRequestPayload,
): DeleteSupplierMasterRequest => ({
  type: SupplierMasterActionTypes.DELETE_SUPPLIER_MASTER_REQUEST,
  payload,
});

export const deleteSupplierMasterSuccess = (
  payload: DeleteSupplierMasterSuccessPayload,
): DeleteSupplierMasterSuccess => ({
  type: SupplierMasterActionTypes.DELETE_SUPPLIER_MASTER_SUCCESS,
  payload,
});

export const deleteSupplierMasterFailure = (
  payload: DeleteSupplierMasterErrorPayload,
): DeleteSupplierMasterError => ({
  type: SupplierMasterActionTypes.DELETE_SUPPLIER_MASTER_FAILURE,
  payload,
});
