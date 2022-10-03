import OrderLineDetailsActionTypes from 'stores/actions/orderLineDetails/orderLineDetailsTypes';
import { OrderLineDetailsActions, OrderLineDetailsState } from 'stores/types/orderLineDetails';

const initialState: OrderLineDetailsState = {
  fetchingOrderLineDetails: false,
  fetchedOrderLineDetails: false,
  orderLineDetails: [],
  orderLineDetail: null,
  error: null,
};

const orderLineDetailsReducer = (
  action: OrderLineDetailsActions,
  state: OrderLineDetailsState = initialState,
) => {
  if (typeof action === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case OrderLineDetailsActionTypes.GET_ORDER_LINE_DETAILS_REQUEST:
      return {
        ...state,
        fetchingOrderLineDetails: true,
        fetchedOrderLineDetails: false,
        orderLineDetails: [],
        error: null,
      };
    case OrderLineDetailsActionTypes.GET_ORDER_LINE_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingOrderLineDetails: false,
        fetchedOrderLineDetails: true,
        orderLineDetails: action.payload,
        error: null,
      };
    case OrderLineDetailsActionTypes.GET_ORDER_LINE_DETAILS_FAILURE:
      return {
        ...state,
        fetchingOrderLineDetails: false,
        orderLineDetails: [],
        error: action.payload,
      };
    case OrderLineDetailsActionTypes.POST_ORDER_LINE_DETAILS_REQUEST:
      return {
        ...state,
        orderLineDetail: null,
        error: null,
      };
    case OrderLineDetailsActionTypes.POST_ORDER_LINE_DETAILS_SUCCESS:
      return {
        ...state,
        orderLineDetail: action.payload,
        error: null,
      };
    case OrderLineDetailsActionTypes.POST_ORDER_LINE_DETAILS_FAILURE:
      return {
        ...state,
        orderLineDetail: null,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default orderLineDetailsReducer;
