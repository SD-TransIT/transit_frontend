import { ControllerRenderProps } from 'react-hook-form';

import { ICustomerMaster } from 'models/customerMaster/ICustomerMaster';
import { IDriver } from 'models/driver/IDriver';

export type PickerProp = {
  field: ControllerRenderProps<ICustomerMaster, 'customer_type'> | ControllerRenderProps<IDriver, 'transporter'>
  isInvalid: boolean;
};
