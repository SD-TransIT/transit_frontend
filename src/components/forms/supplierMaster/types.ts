import { ISupplierMaster } from '../../../models/supplierMaster/ISupplierMasterType';

type SupplierFormType = {
  onSubmit: (formValues: ISupplierMaster) => void;
  onCancel: () => void;
  title: string;
  initialFormValue?: ISupplierMaster;
  submitButtonText?: string;
  mode: string
  onDelete?: (formValues: ISupplierMaster | {}) => void | undefined;
  formData?: ISupplierMaster | undefined
};

export default SupplierFormType;
