import { combineReducers } from 'redux';

import customerTypeReducer from 'reducers/customerTypeReducer';
import driverReducer from 'reducers/driverReducer';
import itemReducer from 'reducers/itemReducer';
import manualUploadFormsReducer from 'reducers/manualUploadForms';
import supplierMasterReducer from 'reducers/supplierMasterReducer';
import tokenReducer from 'reducers/tokenReducer';
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
