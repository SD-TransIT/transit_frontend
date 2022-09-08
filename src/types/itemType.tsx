import { IItem } from 'models/item/IItem';

import ItemActionTypes from 'actions/item/itemTypes';

export interface ItemState {
  fetchingItem: boolean;
  fetchedItem: boolean;
  items: IItem [] | [];
  item: IItem | null;
  error: string | null;
}

export interface GetItemRequestPayload {
  payload: any;
}

export interface GetItemSuccessPayload {
  items: [IItem];
}

export interface GetItemErrorPayload {
  error: string;
}

export interface PostItemRequestPayload {
  payload: IItem;
}

export interface PostItemSuccessPayload {
  item: IItem;
}

export interface PostItemErrorPayload {
  error: string;
}

export interface PutItemRequestPayload {
  payload: IItem;
}

export interface PutItemSuccessPayload {
  item: IItem;
}

export interface PutItemErrorPayload {
  error: string;
}

export interface DeleteItemRequestPayload {
  payload: IItem;
}

export interface DeleteItemSuccessPayload {
}

export interface DeleteItemErrorPayload {
  error: string;
}

export interface GetItemRequest {
  type: typeof ItemActionTypes.GET_ITEM_REQUEST;
  payload: GetItemRequestPayload;
}

export type GetItemSuccess = {
  type: typeof ItemActionTypes.GET_ITEM_SUCCESS;
  payload: GetItemSuccessPayload;
};

export type GetItemError = {
  type: typeof ItemActionTypes.GET_ITEM_FAILURE;
  payload: GetItemErrorPayload;
};

export interface PostItemRequest {
  type: typeof ItemActionTypes.POST_ITEM_REQUEST;
  payload: PostItemRequestPayload;
}

export type PostItemSuccess = {
  type: typeof ItemActionTypes.POST_ITEM_SUCCESS;
  payload: PostItemSuccessPayload;
};

export type PostItemError = {
  type: typeof ItemActionTypes.POST_ITEM_FAILURE;
  payload: PostItemErrorPayload;
};

export interface PutItemRequest {
  type: typeof ItemActionTypes.PUT_ITEM_REQUEST;
  payload: PutItemRequestPayload;
}

export type PutItemSuccess = {
  type: typeof ItemActionTypes.PUT_ITEM_SUCCESS;
  payload: PutItemSuccessPayload;
};

export type PutItemError = {
  type: typeof ItemActionTypes.PUT_ITEM_FAILURE;
  payload: PutItemErrorPayload;
};

export interface DeleteItemRequest {
  type: typeof ItemActionTypes.DELETE_ITEM_REQUEST;
  payload: DeleteItemRequestPayload;
}

export type DeleteItemSuccess = {
  type: typeof ItemActionTypes.DELETE_ITEM_SUCCESS;
  payload: DeleteItemSuccessPayload;
};

export type DeleteItemError = {
  type: typeof ItemActionTypes.DELETE_ITEM_FAILURE;
  payload: DeleteItemErrorPayload;
};

export type ItemActions =
    | GetItemRequest
    | GetItemSuccess
    | GetItemError
    | PostItemRequest
    | PostItemSuccess
    | PostItemError
    | PutItemRequest
    | PutItemSuccess
    | PutItemError
    | DeleteItemRequest
    | DeleteItemSuccess
    | DeleteItemError;
