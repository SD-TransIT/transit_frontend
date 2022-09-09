export type ValidationErrorType = {
  value: string
};

export type PageBodyType = {
  title: string,
  children: React.ReactNode
};

export type DatePickType = {
  currentDate: Date | undefined,
  onChange: (value: Date) => void
};

export type DatePickerCustomInputType = {
  onClick?: () => void,
  onChange?: () => void,
  value?: string
};

export type FormHeaderType = {
  onClick?: () => void,
  title: string
};
