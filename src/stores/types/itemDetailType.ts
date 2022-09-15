import { IItemDetails } from 'models/itemDetails/IItemDetails';
import ItemDetailActionTypes from 'stores/actions/item_detail/itemDetailTypes';

export interface ItemDetailState {
  fetchingItemDetail: boolean;
  fetchedItemDetail: boolean;
  itemsDetails: IItemDetails [] | [];
  itemDetail: IItemDetails | null;
  error: string | null;
}

export interface GetItemDetailRequestPayload {
  payload: any;
}

export interface GetItemDetailSuccessPayload {
  itemsDetails: [IItemDetails];
}

export interface GetItemDetailErrorPayload {
  error: string;
}

export interface PostItemDetailRequestPayload {
  payload: IItemDetails;
}

export interface PostItemDetailSuccessPayload {
  itemDetail: IItemDetails;
}

export interface PostItemDetailErrorPayload {
  error: string;
}

export interface PutItemDetailRequestPayload {
  payload: IItemDetails;
}

export interface PutItemDetailSuccessPayload {
  itemDetail: IItemDetails;
}

export interface PutItemDetailErrorPayload {
  error: string;
}

export interface DeleteItemDetailRequestPayload {
  payload: IItemDetails;
}

export interface DeleteItemDetailSuccessPayload {
}

export interface DeleteItemDetailErrorPayload {
  error: string;
}

export interface GetItemDetailRequest {
  type: typeof ItemDetailActionTypes.GET_ITEM_DETAIL_REQUEST;
  payload: GetItemDetailRequestPayload;
}

export type GetItemDetailSuccess = {
  type: typeof ItemDetailActionTypes.GET_ITEM_DETAIL_SUCCESS;
  payload: GetItemDetailSuccessPayload;
};

export type GetItemDetailError = {
  type: typeof ItemDetailActionTypes.GET_ITEM_DETAIL_FAILURE;
  payload: GetItemDetailErrorPayload;
};

export interface PostItemDetailRequest {
  type: typeof ItemDetailActionTypes.POST_ITEM_DETAIL_REQUEST;
  payload: PostItemDetailRequestPayload;
}

export type PostItemDetailSuccess = {
  type: typeof ItemDetailActionTypes.POST_ITEM_DETAIL_SUCCESS;
  payload: PostItemDetailSuccessPayload;
};

export type PostItemDetailError = {
  type: typeof ItemDetailActionTypes.POST_ITEM_DETAIL_FAILURE;
  payload: PostItemDetailErrorPayload;
};

export interface PutItemDetailRequest {
  type: typeof ItemDetailActionTypes.PUT_ITEM_DETAIL_REQUEST;
  payload: PutItemDetailRequestPayload;
}

export type PutItemDetailSuccess = {
  type: typeof ItemDetailActionTypes.PUT_ITEM_DETAIL_SUCCESS;
  payload: PutItemDetailSuccessPayload;
};

export type PutItemDetailError = {
  type: typeof ItemDetailActionTypes.PUT_ITEM_DETAIL_FAILURE;
  payload: PutItemDetailErrorPayload;
};

export interface DeleteItemDetailRequest {
  type: typeof ItemDetailActionTypes.DELETE_ITEM_DETAIL_REQUEST;
  payload: DeleteItemDetailRequestPayload;
}

export type DeleteItemDetailSuccess = {
  type: typeof ItemDetailActionTypes.DELETE_ITEM_DETAIL_SUCCESS;
  payload: DeleteItemDetailSuccessPayload;
};

export type DeleteItemDetailError = {
  type: typeof ItemDetailActionTypes.DELETE_ITEM_DETAIL_FAILURE;
  payload: DeleteItemDetailErrorPayload;
};

export type ItemDetailActions =
    | GetItemDetailRequest
    | GetItemDetailSuccess
    | GetItemDetailError
    | PostItemDetailRequest
    | PostItemDetailSuccess
    | PostItemDetailError
    | PutItemDetailRequest
    | PutItemDetailSuccess
    | PutItemDetailError
    | DeleteItemDetailRequest
    | DeleteItemDetailSuccess
    | DeleteItemDetailError;
