export type ValidationErrorType = {
  value?: string
};

export type PageBodyType = {
  title: string,
  children: React.ReactNode
  onClick?: () => void,
  isArrow?: boolean,
  isFullScreenRequired?: boolean,
};

export type DatePickType = {
  currentDate: Date | undefined,
  onChange: (value: Date) => void
};

export type DatePickerCustomInputType = {
  onClick?: () => void,
  onChange?: () => void,
  value?: string
  name?: string
};

export type FormHeaderType = {
  onClick?: () => void,
  title: string
};

type ColumnHeaders = {
  label: string
};

export type EditableTableTypes = {
  tableTitle?: string
  buttonTitle?: string
  children: React.ReactNode
  onAddButtonClick: () => void
  columnHeaders: Array<ColumnHeaders>
};

export type SimpleSelectType = {
  options: any
  placeholder: string
  onChange: (value: any) => void
  isDisabled?: boolean
};
