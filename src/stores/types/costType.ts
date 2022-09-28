import { ICost } from 'models/cost/ICost';
import CostActionTypes from 'stores/actions/cost/costTypes';

export interface CostState {
  fetchingCost: boolean;
  fetchedCost: boolean;
  costs: ICost [] | [];
  cost: ICost | null;
  error: string | null;
}

export interface GetCostRequestPayload {
  payload: any;
}

export interface GetCostSuccessPayload {
  costs: [ICost];
}

export interface GetCostErrorPayload {
  error: string;
}

export interface BulkPutCostRequestPayload {
  payload: ICost [];
}

export interface BulkPutCostSuccessPayload {
  costs: ICost [];
}

export interface BulkPutCostErrorPayload {
  error: string;
}

export interface PutCostRequestPayload {
  payload: ICost;
}

export interface PutCostSuccessPayload {
  cost: ICost;
}

export interface PutCostErrorPayload {
  error: string;
}

export interface DeleteCostRequestPayload {
  payload: ICost;
}

export interface DeleteCostSuccessPayload {
}

export interface DeleteCostErrorPayload {
  error: string;
}

export interface GetCostRequest {
  type: typeof CostActionTypes.GET_COST_REQUEST;
  payload: GetCostRequestPayload;
}

export type GetCostSuccess = {
  type: typeof CostActionTypes.GET_COST_SUCCESS;
  payload: GetCostSuccessPayload;
};

export type GetCostError = {
  type: typeof CostActionTypes.GET_COST_FAILURE;
  payload: GetCostErrorPayload;
};

export interface BulkPutCostRequest {
  type: typeof CostActionTypes.BULK_PUT_COST_REQUEST;
  payload: BulkPutCostRequestPayload;
}

export type BulkPutCostSuccess = {
  type: typeof CostActionTypes.BULK_PUT_COST_SUCCESS;
  payload: BulkPutCostSuccessPayload;
};

export type BulkPutCostError = {
  type: typeof CostActionTypes.BULK_PUT_COST_FAILURE;
  payload: BulkPutCostErrorPayload;
};

export interface PutCostRequest {
  type: typeof CostActionTypes.PUT_COST_REQUEST;
  payload: PutCostRequestPayload;
}

export type PutCostSuccess = {
  type: typeof CostActionTypes.PUT_COST_SUCCESS;
  payload: PutCostSuccessPayload;
};

export type PutCostError = {
  type: typeof CostActionTypes.PUT_COST_FAILURE;
  payload: PutCostErrorPayload;
};

export interface DeleteCostRequest {
  type: typeof CostActionTypes.DELETE_COST_REQUEST;
  payload: DeleteCostRequestPayload;
}

export type DeleteCostSuccess = {
  type: typeof CostActionTypes.DELETE_COST_SUCCESS;
  payload: DeleteCostSuccessPayload;
};

export type DeleteCostError = {
  type: typeof CostActionTypes.DELETE_COST_FAILURE;
  payload: DeleteCostErrorPayload;
};

export type CostActions =
    | GetCostRequest
    | GetCostSuccess
    | GetCostError
    | BulkPutCostRequest
    | BulkPutCostSuccess
    | BulkPutCostError
    | PutCostRequest
    | PutCostSuccess
    | PutCostError
    | DeleteCostRequest
    | DeleteCostSuccess
    | DeleteCostError;
