import React, { useCallback } from 'react';

import classNames from 'classnames';

import { DeleteButtonType } from 'shared/buttons/types';
import { useIntl } from 'react-intl';

const style = 'delete-button';

function DeleteButton({ onClick, className }: DeleteButtonType) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(style, className)}
    >
      <p>{format('app.delete')}</p>
    </button>
  );
}

export default DeleteButton;
