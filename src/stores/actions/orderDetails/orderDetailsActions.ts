import {
  DeleteOrderDetailsError,
  DeleteOrderDetailsErrorPayload,
  DeleteOrderDetailsRequest,
  DeleteOrderDetailsRequestPayload,
  DeleteOrderDetailsSuccess,
  DeleteOrderDetailsSuccessPayload,
  GetOrderDetailsError,
  GetOrderDetailsErrorPayload,
  GetOrderDetailsRequest,
  GetOrderDetailsRequestPayload,
  GetOrderDetailsSuccess,
  GetOrderDetailsSuccessPayload,
  PostOrderDetailsError,
  PostOrderDetailsErrorPayload,
  PostOrderDetailsRequest,
  PostOrderDetailsRequestPayload,
  PostOrderDetailsSuccess,
  PostOrderDetailsSuccessPayload,
  PutOrderDetailsError,
  PutOrderDetailsErrorPayload,
  PutOrderDetailsRequest,
  PutOrderDetailsRequestPayload,
  PutOrderDetailsSuccess,
  PutOrderDetailsSuccessPayload,
} from 'stores/types/orderDetailsType';

import OrderDetailsActionTypes from './orderDetailsTypes';

export const getOrderDetailsRequest = (
  payload: GetOrderDetailsRequestPayload,
): GetOrderDetailsRequest => ({
  type: OrderDetailsActionTypes.GET_ORDER_DETAILS_REQUEST,
  payload,
});

export const getOrderDetailsSuccess = (
  payload: GetOrderDetailsSuccessPayload,
): GetOrderDetailsSuccess => ({
  type: OrderDetailsActionTypes.GET_ORDER_DETAILS_SUCCESS,
  payload,
});

export const getOrderDetailsFailure = (
  payload: GetOrderDetailsErrorPayload,
): GetOrderDetailsError => ({
  type: OrderDetailsActionTypes.GET_ORDER_DETAILS_FAILURE,
  payload,
});

export const postOrderDetailsRequest = (
  payload: PostOrderDetailsRequestPayload,
): PostOrderDetailsRequest => ({
  type: OrderDetailsActionTypes.POST_ORDER_DETAILS_REQUEST,
  payload,
});

export const postOrderDetailsSuccess = (
  payload: PostOrderDetailsSuccessPayload,
): PostOrderDetailsSuccess => ({
  type: OrderDetailsActionTypes.POST_ORDER_DETAILS_SUCCESS,
  payload,
});

export const postOrderDetailsFailure = (
  payload: PostOrderDetailsErrorPayload,
): PostOrderDetailsError => ({
  type: OrderDetailsActionTypes.POST_ORDER_DETAILS_FAILURE,
  payload,
});

export const putOrderDetailsRequest = (
  payload: PutOrderDetailsRequestPayload,
): PutOrderDetailsRequest => ({
  type: OrderDetailsActionTypes.PUT_ORDER_DETAILS_REQUEST,
  payload,
});

export const putOrderDetailsSuccess = (
  payload: PutOrderDetailsSuccessPayload,
): PutOrderDetailsSuccess => ({
  type: OrderDetailsActionTypes.PUT_ORDER_DETAILS_SUCCESS,
  payload,
});

export const putOrderDetailsFailure = (
  payload: PutOrderDetailsErrorPayload,
): PutOrderDetailsError => ({
  type: OrderDetailsActionTypes.PUT_ORDER_DETAILS_FAILURE,
  payload,
});

export const deleteOrderDetailsRequest = (
  payload: DeleteOrderDetailsRequestPayload,
): DeleteOrderDetailsRequest => ({
  type: OrderDetailsActionTypes.DELETE_ORDER_DETAILS_REQUEST,
  payload,
});

export const deleteOrderDetailsSuccess = (
  payload: DeleteOrderDetailsSuccessPayload,
): DeleteOrderDetailsSuccess => ({
  type: OrderDetailsActionTypes.DELETE_ORDER_DETAILS_SUCCESS,
  payload,
});

export const deleteOrderDetailsFailure = (
  payload: DeleteOrderDetailsErrorPayload,
): DeleteOrderDetailsError => ({
  type: OrderDetailsActionTypes.DELETE_ORDER_DETAILS_FAILURE,
  payload,
});
