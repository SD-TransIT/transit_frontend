import { IItemDetails } from 'models/itemDetails/IItemDetails';

type ItemDetailFormType = {
  onSubmit: (formValues: IItemDetails) => void;
  onCancel: () => void;
  title: string;
  initialFormValue?: any;
  submitButtonText?: string;
  mode: string
  onDelete?: (formValues: IItemDetails | {}) => void | undefined;
  formData?: IItemDetails | undefined
};

export default ItemDetailFormType;
