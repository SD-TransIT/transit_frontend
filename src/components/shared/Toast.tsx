import React, { useCallback } from 'react';

import {
  RiCheckboxCircleLine,
  RiErrorWarningLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

export function SuccessSaved({ successMessage }: any): JSX.Element {
  return (
    <div className="flex flex-row gap-2">
      <RiCheckboxCircleLine className="text-2xl text-transit-grey-toast" />
      <p className="text-sm text-transit-black">{successMessage}</p>
    </div>
  );
}

export function ErrorMessage() {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  return (
    <div className="flex flex-row gap-2">
      <RiErrorWarningLine className="text-2xl text-transit-red" />
      <p className="text-sm text-transit-black">{format('toast.failure_saved.message')}</p>
    </div>
  );
}

const toastType = (typeHint = '') => {
  switch (typeHint) {
    case 'error':
      return toast.TYPE.ERROR;
    case 'success':
      return toast.TYPE.SUCCESS;
    default:
      return toast.TYPE.DEFAULT;
  }
};

export const showToast = (
  message: JSX.Element,
  typeHint: string,
) => {
  toast(message, {
    autoClose: 5000,
    type: toastType(typeHint),
    hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    onOpen: () => {},
    onClose: () => {},
  });
};
