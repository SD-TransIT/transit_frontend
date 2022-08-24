export type DialogType = {
  children?: React.ReactNode,
  isOpen: boolean
  onClose: () => void,
  onAddClick?: () => void,
  onCancelClick?: () => void,
};
