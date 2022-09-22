import CustomerWeekDaysActionTypes from 'stores/actions/customerWeekDays/customerWeekDaysTypes';
import { CustomerWeekDaysActions, CustomerWeekDaysState } from 'stores/types/customerWeekDays';

const initialState: CustomerWeekDaysState = {
  fetchingCustomerWeekDays: false,
  fetchedCustomerWeekDays: false,
  customerWeekDays: [],
  customerWeekDay: null,
  error: null,
};

const customerWeekDaysReducer = (
  action: CustomerWeekDaysActions,
  state: CustomerWeekDaysState = initialState,
) => {
  if (typeof action === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case CustomerWeekDaysActionTypes.GET_CUSTOMER_WEEK_DAYS_REQUEST:
      return {
        ...state,
        fetchingCustomerWeekDays: true,
        fetchedCustomerType: false,
        customerWeekDays: [],
        error: null,
      };
    case CustomerWeekDaysActionTypes.GET_CUSTOMER_WEEK_DAYS_SUCCESS:
      return {
        ...state,
        fetchingCustomerWeekDays: false,
        fetchedCustomerType: true,
        customerWeekDays: action.payload,
        error: null,
      };
    case CustomerWeekDaysActionTypes.GET_CUSTOMER_WEEK_DAYS_FAILURE:
      return {
        ...state,
        fetchingCustomerWeekDays: false,
        customerWeekDays: [],
        error: action.payload,
      };
    case CustomerWeekDaysActionTypes.POST_CUSTOMER_WEEK_DAYS_REQUEST:
      return {
        ...state,
        customerWeekDay: null,
        error: null,
      };
    case CustomerWeekDaysActionTypes.POST_CUSTOMER_WEEK_DAYS_SUCCESS:
      return {
        ...state,
        customerWeekDay: action.payload,
        error: null,
      };
    case CustomerWeekDaysActionTypes.POST_CUSTOMER_WEEK_DAYS_FAILURE:
      return {
        ...state,
        customerWeekDay: null,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default customerWeekDaysReducer;
