import { IShipment } from '../../../models/shipment/IShipment';

type ShipmentFormType = {
  onCancel: () => void;
  title: string;
  initialFormValue: any;
  submitButtonText: string;
  mode: string
  onDelete?: (formValues: IShipment | {}) => void | undefined;
  formData?: IShipment | undefined;
  initialOrderDetails?: any;
};

export default ShipmentFormType;
