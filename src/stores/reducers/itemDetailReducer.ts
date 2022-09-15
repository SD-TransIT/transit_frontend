import ItemDetailActionTypes from 'stores/actions/item_detail/itemDetailTypes';
import { ItemDetailActions, ItemDetailState } from 'stores/types/itemDetailType';

const initialState: ItemDetailState = {
  fetchingItemDetail: false,
  fetchedItemDetail: false,
  itemsDetails: [],
  itemDetail: null,
  error: null,
};

const itemDetailReducer = (
  action: ItemDetailActions,
  state: ItemDetailState = initialState,
) => {
  if (typeof action === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case ItemDetailActionTypes.GET_ITEM_DETAIL_REQUEST:
      return {
        ...state,
        fetchingItemDetail: true,
        fetchedItemDetail: false,
        itemsDetails: [],
        error: null,
      };
    case ItemDetailActionTypes.GET_ITEM_DETAIL_SUCCESS:
      return {
        ...state,
        fetchingItemDetail: false,
        fetchedItemDetail: true,
        itemsDetails: action.payload,
        error: null,
      };
    case ItemDetailActionTypes.GET_ITEM_DETAIL_FAILURE:
      return {
        ...state,
        fetchingItemDetail: false,
        itemsDetails: [],
        error: action.payload,
      };
    case ItemDetailActionTypes.POST_ITEM_DETAIL_REQUEST:
      return {
        ...state,
        itemDetail: null,
        error: null,
      };
    case ItemDetailActionTypes.POST_ITEM_DETAIL_SUCCESS:
      return {
        ...state,
        itemDetail: action.payload,
        error: null,
      };
    case ItemDetailActionTypes.POST_ITEM_DETAIL_FAILURE:
      return {
        ...state,
        itemDetail: null,
        error: action.payload,
      };
    case ItemDetailActionTypes.PUT_ITEM_DETAIL_REQUEST:
      return {
        ...state,
        itemDetail: null,
        error: null,
      };
    case ItemDetailActionTypes.PUT_ITEM_DETAIL_SUCCESS:
      return {
        ...state,
        itemDetail: action.payload,
        error: null,
      };
    case ItemDetailActionTypes.PUT_ITEM_DETAIL_FAILURE:
      return {
        ...state,
        itemDetail: null,
        error: action.payload,
      };
    case ItemDetailActionTypes.DELETE_ITEM_DETAIL_REQUEST:
      return {
        ...state,
        error: null,
      };
    case ItemDetailActionTypes.DELETE_ITEM_DETAIL_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case ItemDetailActionTypes.DELETE_ITEM_DETAIL_FAILURE:
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

export default itemDetailReducer;
