import CustomerMasterActionTypes from 'stores/actions/customerMaster/customerMasterTypes';
import { CustomerMasterActions, CustomerMasterState } from 'stores/types/customerMasterType';

const initialState: CustomerMasterState = {
  fetchingCustomerMaster: false,
  fetchedCustomerMaster: false,
  customers: [],
  customer: null,
  error: null,
};

const customerMasterReducer = (
  action: CustomerMasterActions,
  state: CustomerMasterState = initialState,
) => {
  if (typeof action === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case CustomerMasterActionTypes.GET_CUSTOMER_MASTER_REQUEST:
      return {
        ...state,
        fetchingCustomerMaster: true,
        fetchedCustomerType: false,
        customers: [],
        error: null,
      };
    case CustomerMasterActionTypes.GET_CUSTOMER_MASTER_SUCCESS:
      return {
        ...state,
        fetchingCustomerMaster: false,
        fetchedCustomerType: true,
        customers: action.payload,
        error: null,
      };
    case CustomerMasterActionTypes.GET_CUSTOMER_MASTER_FAILURE:
      return {
        ...state,
        fetchingCustomerMaster: false,
        customers: [],
        error: action.payload,
      };
    case CustomerMasterActionTypes.POST_CUSTOMER_MASTER_REQUEST:
      return {
        ...state,
        customer: null,
        error: null,
      };
    case CustomerMasterActionTypes.POST_CUSTOMER_MASTER_SUCCESS:
      return {
        ...state,
        customer: action.payload,
        error: null,
      };
    case CustomerMasterActionTypes.POST_CUSTOMER_MASTER_FAILURE:
      return {
        ...state,
        customer: null,
        error: action.payload,
      };
    case CustomerMasterActionTypes.PUT_CUSTOMER_MASTER_REQUEST:
      return {
        ...state,
        customer: null,
        error: null,
      };
    case CustomerMasterActionTypes.PUT_CUSTOMER_MASTER_SUCCESS:
      return {
        ...state,
        customer: action.payload,
        error: null,
      };
    case CustomerMasterActionTypes.PUT_CUSTOMER_MASTER_FAILURE:
      return {
        ...state,
        customer: null,
        error: action.payload,
      };
    case CustomerMasterActionTypes.DELETE_CUSTOMER_MASTER_REQUEST:
      return {
        ...state,
        error: null,
      };
    case CustomerMasterActionTypes.DELETE_CUSTOMER_MASTER_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case CustomerMasterActionTypes.DELETE_CUSTOMER_MASTER_FAILURE:
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

export default customerMasterReducer;
