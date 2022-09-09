import { IItem } from '../../../models/item/IItem';

type ItemFormType = {
  onSubmit: (formValues: IItem) => void;
  onCancel: () => void;
  title: string;
  initialFormValue?: IItem;
  submitButtonText?: string;
  mode: string
  onDelete?: (formValues: IItem | {}) => void | undefined;
  formData?: IItem | undefined
};

export default ItemFormType;
