import { IModeOfTransport } from '../../../models/modeOfTransport/IModeOfTransport';

type ModeOfTransportFormType = {
  onSubmit: (formValues: IModeOfTransport) => void;
  onCancel: () => void;
  title: string;
  initialFormValue?: IModeOfTransport;
  submitButtonText?: string;
  mode: string
  onDelete?: (formValues: IModeOfTransport | {}) => void | undefined;
  formData?: IModeOfTransport | undefined
};

export default ModeOfTransportFormType;
