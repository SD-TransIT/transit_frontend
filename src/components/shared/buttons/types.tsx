export type SubmitButtonType = {
  onClick: () => void,
  title?: string,
  className?: string
  disabled?: boolean,
};

export type CancelButtonType = {
  onClick: () => void,
  className?: string
};

export type ViewButtonType = {
  onClick: () => void,
  className?: string,
  title?: string | null
};

export type ClearButtonType = {
  onClick: () => void,
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
  title?: string
};

export type DeleteButtonType = {
  onClick: () => void,
  className?: string
};

export type DownloadButtonType = {
  onClick: () => void,
  className?: string
};
