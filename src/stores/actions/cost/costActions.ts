import CostActionTypes from 'stores/actions/cost/costTypes';
import {
  BulkPutCostError,
  BulkPutCostErrorPayload,
  BulkPutCostRequest,
  BulkPutCostRequestPayload,
  BulkPutCostSuccess,
  BulkPutCostSuccessPayload,
  DeleteCostError,
  DeleteCostErrorPayload,
  DeleteCostRequest,
  DeleteCostRequestPayload,
  DeleteCostSuccess,
  DeleteCostSuccessPayload,
  GetCostError,
  GetCostErrorPayload,
  GetCostRequest,
  GetCostRequestPayload,
  GetCostSuccess,
  GetCostSuccessPayload,
  PutCostError,
  PutCostErrorPayload,
  PutCostRequest,
  PutCostRequestPayload,
  PutCostSuccess,
  PutCostSuccessPayload,
} from 'stores/types/costType';

export const getCostRequest = (
  payload: GetCostRequestPayload,
): GetCostRequest => ({
  type: CostActionTypes.GET_COST_REQUEST,
  payload,
});

export const getCostSuccess = (
  payload: GetCostSuccessPayload,
): GetCostSuccess => ({
  type: CostActionTypes.GET_COST_SUCCESS,
  payload,
});

export const getCostFailure = (
  payload: GetCostErrorPayload,
): GetCostError => ({
  type: CostActionTypes.GET_COST_FAILURE,
  payload,
});

export const bulkPutCostRequest = (
  payload: BulkPutCostRequestPayload,
): BulkPutCostRequest => ({
  type: CostActionTypes.BULK_PUT_COST_REQUEST,
  payload,
});

export const bulkPutCostSuccess = (
  payload: BulkPutCostSuccessPayload,
): BulkPutCostSuccess => ({
  type: CostActionTypes.BULK_PUT_COST_SUCCESS,
  payload,
});

export const bulkPutCostFailure = (
  payload: BulkPutCostErrorPayload,
): BulkPutCostError => ({
  type: CostActionTypes.BULK_PUT_COST_FAILURE,
  payload,
});

export const putCostRequest = (
  payload: PutCostRequestPayload,
): PutCostRequest => ({
  type: CostActionTypes.PUT_COST_REQUEST,
  payload,
});

export const putCostSuccess = (
  payload: PutCostSuccessPayload,
): PutCostSuccess => ({
  type: CostActionTypes.PUT_COST_SUCCESS,
  payload,
});

export const putCostFailure = (
  payload: PutCostErrorPayload,
): PutCostError => ({
  type: CostActionTypes.PUT_COST_FAILURE,
  payload,
});

export const deleteCostRequest = (
  payload: DeleteCostRequestPayload,
): DeleteCostRequest => ({
  type: CostActionTypes.DELETE_COST_REQUEST,
  payload,
});

export const deleteCostSuccess = (
  payload: DeleteCostSuccessPayload,
): DeleteCostSuccess => ({
  type: CostActionTypes.DELETE_COST_SUCCESS,
  payload,
});

export const deleteCostFailure = (
  payload: DeleteCostErrorPayload,
): DeleteCostError => ({
  type: CostActionTypes.DELETE_COST_FAILURE,
  payload,
});
