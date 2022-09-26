import { IOrderDetails } from 'models/orderDetails/IOrderDetils';
import OrderDetailsActionTypes from 'stores/actions/orderDetails/orderDetailsTypes';

export interface OrderDetailsState {
  fetchingOrderDetails: boolean;
  fetchedOrderDetails: boolean;
  orderDetails: IOrderDetails [] | [];
  orderDetail: IOrderDetails | null;
  error: string | null;
}

export interface GetOrderDetailsRequestPayload {
  payload: any;
}

export interface GetOrderDetailsSuccessPayload {
  orderDetails: [IOrderDetails];
}

export interface GetOrderDetailsErrorPayload {
  error: string;
}

export interface PostOrderDetailsRequestPayload {
  payload: IOrderDetails;
}

export interface PostOrderDetailsSuccessPayload {
  orderDetail: IOrderDetails;
}

export interface PostOrderDetailsErrorPayload {
  error: string;
}

export interface PutOrderDetailsRequestPayload {
  payload: IOrderDetails;
}

export interface PutOrderDetailsSuccessPayload {
  orderDetail: IOrderDetails;
}

export interface PutOrderDetailsErrorPayload {
  error: string;
}

export interface DeleteOrderDetailsRequestPayload {
  payload: IOrderDetails;
}

export interface DeleteOrderDetailsSuccessPayload {
}

export interface DeleteOrderDetailsErrorPayload {
  error: string;
}

export interface GetOrderDetailsRequest {
  type: typeof OrderDetailsActionTypes.GET_ORDER_DETAILS_REQUEST;
  payload: GetOrderDetailsRequestPayload;
}

export type GetOrderDetailsSuccess = {
  type: typeof OrderDetailsActionTypes.GET_ORDER_DETAILS_SUCCESS;
  payload: GetOrderDetailsSuccessPayload;
};

export type GetOrderDetailsError = {
  type: typeof OrderDetailsActionTypes.GET_ORDER_DETAILS_FAILURE;
  payload: GetOrderDetailsErrorPayload;
};

export interface PostOrderDetailsRequest {
  type: typeof OrderDetailsActionTypes.POST_ORDER_DETAILS_REQUEST;
  payload: PostOrderDetailsRequestPayload;
}

export type PostOrderDetailsSuccess = {
  type: typeof OrderDetailsActionTypes.POST_ORDER_DETAILS_SUCCESS;
  payload: PostOrderDetailsSuccessPayload;
};

export type PostOrderDetailsError = {
  type: typeof OrderDetailsActionTypes.POST_ORDER_DETAILS_FAILURE;
  payload: PostOrderDetailsErrorPayload;
};

export interface PutOrderDetailsRequest {
  type: typeof OrderDetailsActionTypes.PUT_ORDER_DETAILS_REQUEST;
  payload: PutOrderDetailsRequestPayload;
}

export type PutOrderDetailsSuccess = {
  type: typeof OrderDetailsActionTypes.PUT_ORDER_DETAILS_SUCCESS;
  payload: PutOrderDetailsSuccessPayload;
};

export type PutOrderDetailsError = {
  type: typeof OrderDetailsActionTypes.PUT_ORDER_DETAILS_FAILURE;
  payload: PutOrderDetailsErrorPayload;
};

export interface DeleteOrderDetailsRequest {
  type: typeof OrderDetailsActionTypes.DELETE_ORDER_DETAILS_REQUEST;
  payload: DeleteOrderDetailsRequestPayload;
}

export type DeleteOrderDetailsSuccess = {
  type: typeof OrderDetailsActionTypes.DELETE_ORDER_DETAILS_SUCCESS;
  payload: DeleteOrderDetailsSuccessPayload;
};

export type DeleteOrderDetailsError = {
  type: typeof OrderDetailsActionTypes.DELETE_ORDER_DETAILS_FAILURE;
  payload: DeleteOrderDetailsErrorPayload;
};

export type OrderDetailsActions =
    | GetOrderDetailsRequest
    | GetOrderDetailsSuccess
    | GetOrderDetailsError
    | PostOrderDetailsRequest
    | PostOrderDetailsSuccess
    | PostOrderDetailsError
    | PutOrderDetailsRequest
    | PutOrderDetailsSuccess
    | PutOrderDetailsError
    | DeleteOrderDetailsRequest
    | DeleteOrderDetailsSuccess
    | DeleteOrderDetailsError;
