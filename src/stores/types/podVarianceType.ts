import { IPodVariance } from 'models/podVariance/IPodVariance';
import PodVarianceActionTypes from 'stores/actions/podVariance/podVarianceTypes';

export interface PodVarianceState {
  fetchingPodVariance: boolean;
  fetchedPodVariance: boolean;
  podVariances: IPodVariance [] | [];
  podVariance: IPodVariance | null;
  error: string | null;
}

export interface GetPodVarianceRequestPayload {
  payload: any;
}

export interface GetPodVarianceSuccessPayload {
  podVariances: [IPodVariance];
}

export interface GetPodVarianceErrorPayload {
  error: string;
}

export interface PostPodVarianceRequestPayload {
  payload: IPodVariance;
}

export interface PostPodVarianceSuccessPayload {
  podVariance: IPodVariance;
}

export interface PostPodVarianceErrorPayload {
  error: string;
}

export interface PutPodVarianceRequestPayload {
  payload: IPodVariance;
}

export interface PutPodVarianceSuccessPayload {
  podVariance: IPodVariance;
}

export interface PutPodVarianceErrorPayload {
  error: string;
}

export interface DeletePodVarianceRequestPayload {
  payload: IPodVariance;
}

export interface DeletePodVarianceSuccessPayload {
}

export interface DeletePodVarianceErrorPayload {
  error: string;
}

export interface GetPodVarianceRequest {
  type: typeof PodVarianceActionTypes.GET_POD_VARIANCE_REQUEST;
  payload: GetPodVarianceRequestPayload;
}

export type GetPodVarianceSuccess = {
  type: typeof PodVarianceActionTypes.GET_POD_VARIANCE_SUCCESS;
  payload: GetPodVarianceSuccessPayload;
};

export type GetPodVarianceError = {
  type: typeof PodVarianceActionTypes.GET_POD_VARIANCE_FAILURE;
  payload: GetPodVarianceErrorPayload;
};

export interface PostPodVarianceRequest {
  type: typeof PodVarianceActionTypes.POST_POD_VARIANCE_REQUEST;
  payload: PostPodVarianceRequestPayload;
}

export type PostPodVarianceSuccess = {
  type: typeof PodVarianceActionTypes.POST_POD_VARIANCE_SUCCESS;
  payload: PostPodVarianceSuccessPayload;
};

export type PostPodVarianceError = {
  type: typeof PodVarianceActionTypes.POST_POD_VARIANCE_FAILURE;
  payload: PostPodVarianceErrorPayload;
};

export interface PutPodVarianceRequest {
  type: typeof PodVarianceActionTypes.PUT_POD_VARIANCE_REQUEST;
  payload: PutPodVarianceRequestPayload;
}

export type PutPodVarianceSuccess = {
  type: typeof PodVarianceActionTypes.PUT_POD_VARIANCE_SUCCESS;
  payload: PutPodVarianceSuccessPayload;
};

export type PutPodVarianceError = {
  type: typeof PodVarianceActionTypes.PUT_POD_VARIANCE_FAILURE;
  payload: PutPodVarianceErrorPayload;
};

export interface DeletePodVarianceRequest {
  type: typeof PodVarianceActionTypes.DELETE_POD_VARIANCE_REQUEST;
  payload: DeletePodVarianceRequestPayload;
}

export type DeletePodVarianceSuccess = {
  type: typeof PodVarianceActionTypes.DELETE_POD_VARIANCE_SUCCESS;
  payload: DeletePodVarianceSuccessPayload;
};

export type DeletePodVarianceError = {
  type: typeof PodVarianceActionTypes.DELETE_POD_VARIANCE_FAILURE;
  payload: DeletePodVarianceErrorPayload;
};

export type PodVarianceActions =
    | GetPodVarianceRequest
    | GetPodVarianceSuccess
    | GetPodVarianceError
    | PostPodVarianceRequest
    | PostPodVarianceSuccess
    | PostPodVarianceError
    | PutPodVarianceRequest
    | PutPodVarianceSuccess
    | PutPodVarianceError
    | DeletePodVarianceRequest
    | DeletePodVarianceSuccess
    | DeletePodVarianceError;
