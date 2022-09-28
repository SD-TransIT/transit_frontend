import { IOrderLineDetailsType } from 'models/orderLineDetails/IOrderLinedetailsType';
import OrderLineDetailsActionTypes from 'stores/actions/orderLineDetails/orderLineDetailsTypes';

export interface OrderLineDetailsState {
  fetchingOrderLineDetails: boolean;
  fetchedOrderLineDetails: boolean;
  orderLineDetails: IOrderLineDetailsType [] | [];
  orderLineDetail: IOrderLineDetailsType | null;
  error: string | null;
}

export interface GetOrderLineDetailsRequestPayload {
  payload: any;
}

export interface GetOrderLineDetailsSuccessPayload {
  orderLineDetails: [IOrderLineDetailsType];
}

export interface GetOrderLineDetailsErrorPayload {
  error: string;
}

export interface PostOrderLineDetailsRequestPayload {
  payload: { week_days: any, id: number };
}

export interface PostOrderLineDetailsSuccessPayload {
  orderLineDetail: IOrderLineDetailsType;
}

export interface PostOrderLineDetailsErrorPayload {
  error: string;
}

export interface GetOrderLineDetailsRequest {
  type: typeof OrderLineDetailsActionTypes.GET_ORDER_LINE_DETAILS_REQUEST;
  payload: GetOrderLineDetailsRequestPayload;
}

export type GetOrderLineDetailsSuccess = {
  type: typeof OrderLineDetailsActionTypes.GET_ORDER_LINE_DETAILS_SUCCESS;
  payload: GetOrderLineDetailsSuccessPayload;
};

export type GetOrderLineDetailsError = {
  type: typeof OrderLineDetailsActionTypes.GET_ORDER_LINE_DETAILS_FAILURE;
  payload: GetOrderLineDetailsErrorPayload;
};

export interface PostOrderLineDetailsRequest {
  type: typeof OrderLineDetailsActionTypes.POST_ORDER_LINE_DETAILS_REQUEST;
  payload: PostOrderLineDetailsRequestPayload;
}

export type PostOrderLineDetailsSuccess = {
  type: typeof OrderLineDetailsActionTypes.POST_ORDER_LINE_DETAILS_SUCCESS;
  payload: PostOrderLineDetailsSuccessPayload;
};

export type PostOrderLineDetailsError = {
  type: typeof OrderLineDetailsActionTypes.POST_ORDER_LINE_DETAILS_FAILURE;
  payload: PostOrderLineDetailsErrorPayload;
};

export type OrderLineDetailsActions =
    | GetOrderLineDetailsRequest
    | GetOrderLineDetailsSuccess
    | GetOrderLineDetailsError
    | PostOrderLineDetailsRequest
    | PostOrderLineDetailsSuccess
    | PostOrderLineDetailsError;
