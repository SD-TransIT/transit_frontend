export type SubmitButtonType = {
  onClick: () => void,
  title?: string,
  className?: string
};

export type CancelButtonType = {
  onClick: () => void,
  className?: string
};

export type ClearButtonType = {
  onClick: () => void,
  title?: string,
  className?: string
};

export type PaginationButtonType = {
  onClick: () => void,
  children: React.ReactNode,
  disabled?: boolean,
  className?: string
};

export type AddItemButtonType = {
  onClick: () => void,
  children: React.ReactNode,
  className?: string
};

export type DeleteButtonType = {
  onClick: () => void,
  className?: string
};
