import React, { useCallback } from 'react';

import classNames from 'classnames';
import { useIntl } from 'react-intl';

import { AddItemButtonType } from 'shared/buttons/types';

const style = 'add-item';

function AddItemButton({
  onClick, children, className,
}: AddItemButtonType) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(style, className)}
    >
      {children}
      <p className="pl-1">{format('app.add_item')}</p>
    </button>
  );
}

export default AddItemButton;
