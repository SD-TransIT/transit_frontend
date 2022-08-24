export type DialogType = {
  children?: React.ReactNode,
  isOpen: boolean
  onClose: () => void,
  onSubmitClick?: () => void,
  onCancelClick?: () => void,
  customSubmitButtonTitle?: string,
  customCancelButtonTitle?: string,
};
