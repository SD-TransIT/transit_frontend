import ItemActionTypes from 'stores/actions/item/itemTypes';
import {
  DeleteItemError,
  DeleteItemErrorPayload,
  DeleteItemRequest,
  DeleteItemRequestPayload,
  DeleteItemSuccess,
  DeleteItemSuccessPayload,
  GetItemError,
  GetItemErrorPayload,
  GetItemRequest,
  GetItemRequestPayload,
  GetItemSuccess,
  GetItemSuccessPayload,
  PostItemError,
  PostItemErrorPayload,
  PostItemRequest,
  PostItemRequestPayload,
  PostItemSuccess,
  PostItemSuccessPayload,
  PutItemError,
  PutItemErrorPayload,
  PutItemRequest,
  PutItemRequestPayload,
  PutItemSuccess,
  PutItemSuccessPayload,
} from 'stores/types/itemType';

export const getItemRequest = (
  payload: GetItemRequestPayload,
): GetItemRequest => ({
  type: ItemActionTypes.GET_ITEM_REQUEST,
  payload,
});

export const getItemSuccess = (
  payload: GetItemSuccessPayload,
): GetItemSuccess => ({
  type: ItemActionTypes.GET_ITEM_SUCCESS,
  payload,
});

export const getItemFailure = (
  payload: GetItemErrorPayload,
): GetItemError => ({
  type: ItemActionTypes.GET_ITEM_FAILURE,
  payload,
});

export const postItemRequest = (
  payload: PostItemRequestPayload,
): PostItemRequest => ({
  type: ItemActionTypes.POST_ITEM_REQUEST,
  payload,
});

export const postItemSuccess = (
  payload: PostItemSuccessPayload,
): PostItemSuccess => ({
  type: ItemActionTypes.POST_ITEM_SUCCESS,
  payload,
});

export const postItemFailure = (
  payload: PostItemErrorPayload,
): PostItemError => ({
  type: ItemActionTypes.POST_ITEM_FAILURE,
  payload,
});

export const putItemRequest = (
  payload: PutItemRequestPayload,
): PutItemRequest => ({
  type: ItemActionTypes.PUT_ITEM_REQUEST,
  payload,
});

export const putItemSuccess = (
  payload: PutItemSuccessPayload,
): PutItemSuccess => ({
  type: ItemActionTypes.PUT_ITEM_SUCCESS,
  payload,
});

export const putItemFailure = (
  payload: PutItemErrorPayload,
): PutItemError => ({
  type: ItemActionTypes.PUT_ITEM_FAILURE,
  payload,
});

export const deleteItemRequest = (
  payload: DeleteItemRequestPayload,
): DeleteItemRequest => ({
  type: ItemActionTypes.DELETE_ITEM_REQUEST,
  payload,
});

export const deleteItemSuccess = (
  payload: DeleteItemSuccessPayload,
): DeleteItemSuccess => ({
  type: ItemActionTypes.DELETE_ITEM_SUCCESS,
  payload,
});

export const deleteItemFailure = (
  payload: DeleteItemErrorPayload,
): DeleteItemError => ({
  type: ItemActionTypes.DELETE_ITEM_FAILURE,
  payload,
});
