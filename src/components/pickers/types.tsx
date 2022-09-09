import { ControllerRenderProps, FieldValues } from 'react-hook-form';

export type PickerProp = {
  field: ControllerRenderProps<FieldValues, 'transporter'>;
  isInvalid: boolean;
};
