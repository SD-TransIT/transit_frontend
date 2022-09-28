import { combineReducers } from 'redux';

import customerTypeReducer from 'stores/reducers/customerTypeReducer';
import driverReducer from 'stores/reducers/driverReducer';
import itemReducer from 'stores/reducers/itemReducer';
import manualUploadFormsReducer from 'stores/reducers/manualUploadForms';
import modeOfTransportReducer from 'stores/reducers/modeOfTransport';
import supplierMasterReducer from 'stores/reducers/supplierMasterReducer';
import tokenReducer from 'stores/reducers/tokenReducer';
import transporterReducer from 'stores/reducers/transporterReducer';

import costReducer from './costReducer';
import customerMasterReducer from './customerMasterReducer';
import customerWeekDaysReducer from './customerWeekDaysReducer';
import itemDetailReducer from './itemDetailReducer';
import orderDetailsReducer from './orderDetailsReducer';
import podVarianceReducer from './podVarianceReducer';
import shipmentReducer from './shipmentReducer';
import transporterDetailsReducer from './transporterDetailsReducer';

const rootReducer = combineReducers({
  token: tokenReducer,
  customerType: customerTypeReducer,
  manualUploadForms: manualUploadFormsReducer,
  driver: driverReducer,
  supplierMaster: supplierMasterReducer,
  transporter: transporterReducer,
  item: itemReducer,
  modeOfTransport: modeOfTransportReducer,
  shipment: shipmentReducer,
  customerMaster: customerMasterReducer,
  itemDetail: itemDetailReducer,
  customerWeekDays: customerWeekDaysReducer,
  transporterDetails: transporterDetailsReducer,
  cost: costReducer,
  orderDetails: orderDetailsReducer,
  podVariance: podVarianceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
