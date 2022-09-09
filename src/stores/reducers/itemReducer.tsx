import ItemActionTypes from 'stores/actions/item/itemTypes';
import { ItemActions, ItemState } from 'stores/types/itemType';

const initialState: ItemState = {
  fetchingItem: false,
  fetchedItem: false,
  items: [],
  item: null,
  error: null,
};

const itemReducer = (
  action: ItemActions,
  state: ItemState = initialState,
) => {
  if (typeof action === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case ItemActionTypes.GET_ITEM_REQUEST:
      return {
        ...state,
        fetchingItem: true,
        fetchedItem: false,
        items: [],
        error: null,
      };
    case ItemActionTypes.GET_ITEM_SUCCESS:
      return {
        ...state,
        fetchingItem: false,
        fetchedItem: true,
        items: action.payload,
        error: null,
      };
    case ItemActionTypes.GET_ITEM_FAILURE:
      return {
        ...state,
        fetchingItem: false,
        items: [],
        error: action.payload,
      };
    case ItemActionTypes.POST_ITEM_REQUEST:
      return {
        ...state,
        item: null,
        error: null,
      };
    case ItemActionTypes.POST_ITEM_SUCCESS:
      return {
        ...state,
        item: action.payload,
        error: null,
      };
    case ItemActionTypes.POST_ITEM_FAILURE:
      return {
        ...state,
        item: null,
        error: action.payload,
      };
    case ItemActionTypes.PUT_ITEM_REQUEST:
      return {
        ...state,
        item: null,
        error: null,
      };
    case ItemActionTypes.PUT_ITEM_SUCCESS:
      return {
        ...state,
        item: action.payload,
        error: null,
      };
    case ItemActionTypes.PUT_ITEM_FAILURE:
      return {
        ...state,
        item: null,
        error: action.payload,
      };
    case ItemActionTypes.DELETE_ITEM_REQUEST:
      return {
        ...state,
        error: null,
      };
    case ItemActionTypes.DELETE_ITEM_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case ItemActionTypes.DELETE_ITEM_FAILURE:
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

export default itemReducer;
