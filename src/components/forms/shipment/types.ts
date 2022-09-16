import { IShipment } from '../../../models/shipment/IShipment';

type ShipmentFormType = {
  onSubmit: (formValues: IShipment) => void;
  onCancel: () => void;
  title: string;
  initialFormValue: any;
  submitButtonText: string;
  mode: string
  onDelete?: (formValues: IShipment | {}) => void | undefined;
  formData?: IShipment | undefined
};

export default ShipmentFormType;
