import {
  DeleteItemDetailError,
  DeleteItemDetailErrorPayload,
  DeleteItemDetailRequest,
  DeleteItemDetailRequestPayload,
  DeleteItemDetailSuccess,
  DeleteItemDetailSuccessPayload,
  GetItemDetailError,
  GetItemDetailErrorPayload,
  GetItemDetailRequest,
  GetItemDetailRequestPayload,
  GetItemDetailSuccess,
  GetItemDetailSuccessPayload,
  PostItemDetailError,
  PostItemDetailErrorPayload,
  PostItemDetailRequest,
  PostItemDetailRequestPayload,
  PostItemDetailSuccess,
  PostItemDetailSuccessPayload,
  PutItemDetailError,
  PutItemDetailErrorPayload,
  PutItemDetailRequest,
  PutItemDetailRequestPayload,
  PutItemDetailSuccess,
  PutItemDetailSuccessPayload,
} from 'stores/types/itemDetailType';

import ItemDetailActionTypes from './itemDetailTypes';

export const getItemDetailRequest = (
  payload: GetItemDetailRequestPayload,
): GetItemDetailRequest => ({
  type: ItemDetailActionTypes.GET_ITEM_DETAIL_REQUEST,
  payload,
});

export const getItemDetailSuccess = (
  payload: GetItemDetailSuccessPayload,
): GetItemDetailSuccess => ({
  type: ItemDetailActionTypes.GET_ITEM_DETAIL_SUCCESS,
  payload,
});

export const getItemDetailFailure = (
  payload: GetItemDetailErrorPayload,
): GetItemDetailError => ({
  type: ItemDetailActionTypes.GET_ITEM_DETAIL_FAILURE,
  payload,
});

export const postItemDetailRequest = (
  payload: PostItemDetailRequestPayload,
): PostItemDetailRequest => ({
  type: ItemDetailActionTypes.POST_ITEM_DETAIL_REQUEST,
  payload,
});

export const postItemDetailSuccess = (
  payload: PostItemDetailSuccessPayload,
): PostItemDetailSuccess => ({
  type: ItemDetailActionTypes.POST_ITEM_DETAIL_SUCCESS,
  payload,
});

export const postItemDetailFailure = (
  payload: PostItemDetailErrorPayload,
): PostItemDetailError => ({
  type: ItemDetailActionTypes.POST_ITEM_DETAIL_FAILURE,
  payload,
});

export const putItemDetailRequest = (
  payload: PutItemDetailRequestPayload,
): PutItemDetailRequest => ({
  type: ItemDetailActionTypes.PUT_ITEM_DETAIL_REQUEST,
  payload,
});

export const putItemDetailSuccess = (
  payload: PutItemDetailSuccessPayload,
): PutItemDetailSuccess => ({
  type: ItemDetailActionTypes.PUT_ITEM_DETAIL_SUCCESS,
  payload,
});

export const putItemDetailFailure = (
  payload: PutItemDetailErrorPayload,
): PutItemDetailError => ({
  type: ItemDetailActionTypes.PUT_ITEM_DETAIL_FAILURE,
  payload,
});

export const deleteItemDetailRequest = (
  payload: DeleteItemDetailRequestPayload,
): DeleteItemDetailRequest => ({
  type: ItemDetailActionTypes.DELETE_ITEM_DETAIL_REQUEST,
  payload,
});

export const deleteItemDetailSuccess = (
  payload: DeleteItemDetailSuccessPayload,
): DeleteItemDetailSuccess => ({
  type: ItemDetailActionTypes.DELETE_ITEM_DETAIL_SUCCESS,
  payload,
});

export const deleteItemDetailFailure = (
  payload: DeleteItemDetailErrorPayload,
): DeleteItemDetailError => ({
  type: ItemDetailActionTypes.DELETE_ITEM_DETAIL_FAILURE,
  payload,
});
