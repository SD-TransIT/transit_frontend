import { ControllerRenderProps, FieldValues } from 'react-hook-form';

export type TransporterPickerProp = {
  field: ControllerRenderProps<FieldValues, 'transporter'>;
  isInvalid: boolean;
};

export type DriverPickerProp = {
  field: ControllerRenderProps<FieldValues, 'driver'>;
  isInvalid: boolean;
  watch?: any;
  isShipment?: boolean;
  setValue: (name: string, value: unknown, config?: Object) => void;
};

export type SupplierPickerProp = {
  field: ControllerRenderProps<FieldValues, 'supplier'>;
  isInvalid: boolean;
};

export type TransporterDetailsPickerProp = {
  field: ControllerRenderProps<FieldValues, 'transporter_details'>;
  isInvalid: boolean;
  watch?: any;
  isShipment?: boolean;
  setValue: (name: string, value: unknown, config?: Object) => void;
};
