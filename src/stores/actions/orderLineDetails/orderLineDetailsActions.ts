import {
  GetOrderLineDetailsError,
  GetOrderLineDetailsErrorPayload,
  GetOrderLineDetailsRequest,
  GetOrderLineDetailsRequestPayload,
  GetOrderLineDetailsSuccess,
  GetOrderLineDetailsSuccessPayload,
  PostOrderLineDetailsError,
  PostOrderLineDetailsErrorPayload,
  PostOrderLineDetailsRequest,
  PostOrderLineDetailsRequestPayload,
  PostOrderLineDetailsSuccess,
  PostOrderLineDetailsSuccessPayload,
} from 'stores/types/orderLineDetails';

import OrderLineDetailsActionTypes from './orderLineDetailsTypes';

export const getOrderLineDetailsRequest = (
  payload: GetOrderLineDetailsRequestPayload,
): GetOrderLineDetailsRequest => ({
  type: OrderLineDetailsActionTypes.GET_ORDER_LINE_DETAILS_REQUEST,
  payload,
});

export const getOrderLineDetailsSuccess = (
  payload: GetOrderLineDetailsSuccessPayload,
): GetOrderLineDetailsSuccess => ({
  type: OrderLineDetailsActionTypes.GET_ORDER_LINE_DETAILS_SUCCESS,
  payload,
});

export const getOrderLineDetailsFailure = (
  payload: GetOrderLineDetailsErrorPayload,
): GetOrderLineDetailsError => ({
  type: OrderLineDetailsActionTypes.GET_ORDER_LINE_DETAILS_FAILURE,
  payload,
});

export const postOrderLineDetailsRequest = (
  payload: PostOrderLineDetailsRequestPayload,
): PostOrderLineDetailsRequest => ({
  type: OrderLineDetailsActionTypes.POST_ORDER_LINE_DETAILS_REQUEST,
  payload,
});

export const postOrderLineDetailsSuccess = (
  payload: PostOrderLineDetailsSuccessPayload,
): PostOrderLineDetailsSuccess => ({
  type: OrderLineDetailsActionTypes.POST_ORDER_LINE_DETAILS_SUCCESS,
  payload,
});

export const postOrderLineDetailsFailure = (
  payload: PostOrderLineDetailsErrorPayload,
): PostOrderLineDetailsError => ({
  type: OrderLineDetailsActionTypes.POST_ORDER_LINE_DETAILS_FAILURE,
  payload,
});
