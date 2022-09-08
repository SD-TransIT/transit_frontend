import { combineReducers } from 'redux';
import tokenReducer from 'reducers/tokenReducer';
import customerTypeReducer from 'reducers/customerTypeReducer';
import manualUploadFormsReducer from 'reducers/manualUploadForms';
import driverReducer from 'reducers/driverReducer';
import supplierMasterReducer from 'reducers/supplierMasterReducer';
import transporterReducer from 'reducers/transporterReducer';
import itemReducer from 'reducers/itemReducer';
import modeOfTransportReducer from 'reducers/modeOfTransport';

const rootReducer = combineReducers({
  token: tokenReducer,
  customerType: customerTypeReducer,
  manualUploadForms: manualUploadFormsReducer,
  driver: driverReducer,
  supplierMaster: supplierMasterReducer,
  transporter: transporterReducer,
  item: itemReducer,
  modeOfTransport: modeOfTransportReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
