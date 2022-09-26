import OrderDetailsActionTypes from 'stores/actions/orderDetails/orderDetailsTypes';
import { OrderDetailsActions, OrderDetailsState } from 'stores/types/orderDetailsType';

const initialState: OrderDetailsState = {
  fetchingOrderDetails: false,
  fetchedOrderDetails: false,
  orderDetails: [],
  orderDetail: null,
  error: null,
};

const orderDetailsReducer = (
  action: OrderDetailsActions,
  state: OrderDetailsState = initialState,
) => {
  if (typeof action === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case OrderDetailsActionTypes.GET_ORDER_DETAILS_REQUEST:
      return {
        ...state,
        fetchingOrderDetails: true,
        fetchedOrderDetails: false,
        orderDetails: [],
        error: null,
      };
    case OrderDetailsActionTypes.GET_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingOrderDetails: false,
        fetchedOrderDetails: true,
        orderDetails: action.payload,
        error: null,
      };
    case OrderDetailsActionTypes.GET_ORDER_DETAILS_FAILURE:
      return {
        ...state,
        fetchingOrderDetails: false,
        orderDetails: [],
        error: action.payload,
      };
    case OrderDetailsActionTypes.POST_ORDER_DETAILS_REQUEST:
      return {
        ...state,
        orderDetail: null,
        error: null,
      };
    case OrderDetailsActionTypes.POST_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        orderDetail: action.payload,
        error: null,
      };
    case OrderDetailsActionTypes.POST_ORDER_DETAILS_FAILURE:
      return {
        ...state,
        orderDetail: null,
        error: action.payload,
      };
    case OrderDetailsActionTypes.PUT_ORDER_DETAILS_REQUEST:
      return {
        ...state,
        orderDetail: null,
        error: null,
      };
    case OrderDetailsActionTypes.PUT_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        orderDetail: action.payload,
        error: null,
      };
    case OrderDetailsActionTypes.PUT_ORDER_DETAILS_FAILURE:
      return {
        ...state,
        orderDetail: null,
        error: action.payload,
      };
    case OrderDetailsActionTypes.DELETE_ORDER_DETAILS_REQUEST:
      return {
        ...state,
        error: null,
      };
    case OrderDetailsActionTypes.DELETE_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case OrderDetailsActionTypes.DELETE_ORDER_DETAILS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default orderDetailsReducer;
