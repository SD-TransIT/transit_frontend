import SupplierMasterActionTypes from 'stores/actions/supplierMaster/supplierMasterTypes';
import { SupplierMasterActions, SupplierMasterState } from 'stores/types/supplierMasterType';

const initialState: SupplierMasterState = {
  fetchingSupplierMaster: false,
  fetchedSupplierMaster: false,
  supplierMasters: [],
  supplierMaster: null,
  error: null,
};

const supplierMasterReducer = (
  action: SupplierMasterActions,
  state: SupplierMasterState = initialState,
) => {
  if (typeof action === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case SupplierMasterActionTypes.GET_SUPPLIER_MASTER_REQUEST:
      return {
        ...state,
        fetchingSupplierMaster: true,
        fetchedSupplierMaster: false,
        supplierMasters: [],
        error: null,
      };
    case SupplierMasterActionTypes.GET_SUPPLIER_MASTER_SUCCESS:
      return {
        ...state,
        fetchingSupplierMaster: false,
        fetchedSupplierMaster: true,
        supplierMasters: action.payload,
        error: null,
      };
    case SupplierMasterActionTypes.GET_SUPPLIER_MASTER_FAILURE:
      return {
        ...state,
        fetchingSupplierMaster: false,
        supplierMasters: [],
        error: action.payload,
      };
    case SupplierMasterActionTypes.POST_SUPPLIER_MASTER_REQUEST:
      return {
        ...state,
        supplierMaster: null,
        error: null,
      };
    case SupplierMasterActionTypes.POST_SUPPLIER_MASTER_SUCCESS:
      return {
        ...state,
        supplierMaster: action.payload,
        error: null,
      };
    case SupplierMasterActionTypes.POST_SUPPLIER_MASTER_FAILURE:
      return {
        ...state,
        supplierMaster: null,
        error: action.payload,
      };
    case SupplierMasterActionTypes.PUT_SUPPLIER_MASTER_REQUEST:
      return {
        ...state,
        supplierMaster: null,
        error: null,
      };
    case SupplierMasterActionTypes.PUT_SUPPLIER_MASTER_SUCCESS:
      return {
        ...state,
        supplierMaster: action.payload,
        error: null,
      };
    case SupplierMasterActionTypes.PUT_SUPPLIER_MASTER_FAILURE:
      return {
        ...state,
        supplierMaster: null,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default supplierMasterReducer;
