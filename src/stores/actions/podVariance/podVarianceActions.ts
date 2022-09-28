import {
  DeletePodVarianceError,
  DeletePodVarianceErrorPayload,
  DeletePodVarianceRequest,
  DeletePodVarianceRequestPayload,
  DeletePodVarianceSuccess,
  DeletePodVarianceSuccessPayload,
  GetPodVarianceError,
  GetPodVarianceErrorPayload,
  GetPodVarianceRequest,
  GetPodVarianceRequestPayload,
  GetPodVarianceSuccess,
  GetPodVarianceSuccessPayload,
  PostPodVarianceError,
  PostPodVarianceErrorPayload,
  PostPodVarianceRequest,
  PostPodVarianceRequestPayload,
  PostPodVarianceSuccess,
  PostPodVarianceSuccessPayload,
  PutPodVarianceError,
  PutPodVarianceErrorPayload,
  PutPodVarianceRequest,
  PutPodVarianceRequestPayload,
  PutPodVarianceSuccess,
  PutPodVarianceSuccessPayload,
} from 'stores/types/podVarianceType';

import PodVarianceActionTypes from './podVarianceTypes';

export const getPodVarianceRequest = (
  payload: GetPodVarianceRequestPayload,
): GetPodVarianceRequest => ({
  type: PodVarianceActionTypes.GET_POD_VARIANCE_REQUEST,
  payload,
});

export const getPodVarianceSuccess = (
  payload: GetPodVarianceSuccessPayload,
): GetPodVarianceSuccess => ({
  type: PodVarianceActionTypes.GET_POD_VARIANCE_SUCCESS,
  payload,
});

export const getPodVarianceFailure = (
  payload: GetPodVarianceErrorPayload,
): GetPodVarianceError => ({
  type: PodVarianceActionTypes.GET_POD_VARIANCE_FAILURE,
  payload,
});

export const postPodVarianceRequest = (
  payload: PostPodVarianceRequestPayload,
): PostPodVarianceRequest => ({
  type: PodVarianceActionTypes.POST_POD_VARIANCE_REQUEST,
  payload,
});

export const postPodVarianceSuccess = (
  payload: PostPodVarianceSuccessPayload,
): PostPodVarianceSuccess => ({
  type: PodVarianceActionTypes.POST_POD_VARIANCE_SUCCESS,
  payload,
});

export const postPodVarianceFailure = (
  payload: PostPodVarianceErrorPayload,
): PostPodVarianceError => ({
  type: PodVarianceActionTypes.POST_POD_VARIANCE_FAILURE,
  payload,
});

export const putPodVarianceRequest = (
  payload: PutPodVarianceRequestPayload,
): PutPodVarianceRequest => ({
  type: PodVarianceActionTypes.PUT_POD_VARIANCE_REQUEST,
  payload,
});

export const putPodVarianceSuccess = (
  payload: PutPodVarianceSuccessPayload,
): PutPodVarianceSuccess => ({
  type: PodVarianceActionTypes.PUT_POD_VARIANCE_SUCCESS,
  payload,
});

export const putPodVarianceFailure = (
  payload: PutPodVarianceErrorPayload,
): PutPodVarianceError => ({
  type: PodVarianceActionTypes.PUT_POD_VARIANCE_FAILURE,
  payload,
});

export const deletePodVarianceRequest = (
  payload: DeletePodVarianceRequestPayload,
): DeletePodVarianceRequest => ({
  type: PodVarianceActionTypes.DELETE_POD_VARIANCE_REQUEST,
  payload,
});

export const deletePodVarianceSuccess = (
  payload: DeletePodVarianceSuccessPayload,
): DeletePodVarianceSuccess => ({
  type: PodVarianceActionTypes.DELETE_POD_VARIANCE_SUCCESS,
  payload,
});

export const deletePodVarianceFailure = (
  payload: DeletePodVarianceErrorPayload,
): DeletePodVarianceError => ({
  type: PodVarianceActionTypes.DELETE_POD_VARIANCE_FAILURE,
  payload,
});
