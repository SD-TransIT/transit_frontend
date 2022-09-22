import { ControllerRenderProps, FieldValues } from 'react-hook-form';

import { ICustomerMaster } from 'models/customerMaster/ICustomerMaster';
import { IDriver } from 'models/driver/IDriver';
import { IItemDetails } from 'models/itemDetails/IItemDetails';

export type TransporterPickerProp = {
  field: ControllerRenderProps<FieldValues, 'transporter'>;
  isInvalid: boolean;
};
export type PickerProp = {
  field: ControllerRenderProps<ICustomerMaster, 'customer_type'> | ControllerRenderProps<IDriver, 'transporter'> | ControllerRenderProps<IItemDetails, 'item_master'>
  isInvalid: boolean;
};

export type DriverPickerProp = {
  field: ControllerRenderProps<FieldValues, 'driver'>;
  isInvalid: boolean;
  watch?: any;
  isShipment?: boolean;
  setValue: (name: string, value: unknown, config?: Object) => void;
  mode?: string; // possible values: 'Edit', 'Add', ''
  initialFormValue?: any;
};

export type TransporterDetailsPickerProp = {
  field: ControllerRenderProps<FieldValues, 'transporter_details'>;
  isInvalid: boolean;
  watch?: any;
  isShipment?: boolean;
  setValue: (name: string, value: unknown, config?: Object) => void;
  mode?: string; // possible values: 'Edit', 'Add', ''
  initialFormValue?: any;
};

export type OrderPickerProp = {
  field: ControllerRenderProps<FieldValues, 'order_details'>;
  isInvalid: boolean;
  watch?: any;
  isShipment?: boolean;
  setValue: (name: string, value: unknown, config?: Object) => void;
};

export type SupplierPickerProp = {
  field: ControllerRenderProps<FieldValues, 'supplier'>;
  isInvalid: boolean;
};

export type CustomerPickerProp = {
  field: ControllerRenderProps<FieldValues, 'customer'>;
  isInvalid: boolean;
  isDisabled: boolean;
};
