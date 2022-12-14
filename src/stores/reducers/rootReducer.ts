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
import excelUploadReducer from './excelUploadReducer';
import itemDetailReducer from './itemDetailReducer';
import orderDetailsReducer from './orderDetailsReducer';
import orderLineDetailsReducer from './orderLineDetails';
import podVarianceReducer from './podVarianceReducer';
import reportsReducer from './reportsReducer';
import shipmentImagesReducer from './shipmentImagesReducer';
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
  shipmentImages: shipmentImagesReducer,
  customerMaster: customerMasterReducer,
  itemDetail: itemDetailReducer,
  transporterDetails: transporterDetailsReducer,
  cost: costReducer,
  orderDetails: orderDetailsReducer,
  podVariance: podVarianceReducer,
  orderLineDetails: orderLineDetailsReducer,
  excelUpload: excelUploadReducer,
  reports: reportsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
