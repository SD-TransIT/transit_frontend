import React, { useCallback } from 'react';

import classNames from 'classnames';
import { useIntl } from 'react-intl';

import { DeleteButtonType } from 'components/shared/buttons/types';

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
