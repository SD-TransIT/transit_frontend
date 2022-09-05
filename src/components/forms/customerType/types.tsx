import { FieldValues } from 'react-hook-form';

export type CustomerTypeFormProps = {
  onSubmit: (formValues: FieldValues) => void;
  onCancel: () => void;
  title: string;
  initialFormValue: FieldValues;
  submitButtonText: string;
  mode: string
  onDelete?: (formValues: FieldValues) => void | undefined;
};
