export type DialogType = {
  children?: React.ReactNode,
  isOpen: boolean,
  setCustomDialogContent: boolean
  onClose: () => void,
  onSubmitClick?: () => void,
  onCancelClick?: () => void,
  customSubmitButtonTitle?: string,
  customCancelButtonTitle?: string,
};
