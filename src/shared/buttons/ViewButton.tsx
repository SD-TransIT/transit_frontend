import React, { useCallback } from 'react';

import classNames from 'classnames';
import { useIntl } from 'react-intl';

import { ViewButtonType } from 'shared/buttons/types';

const style = 'cancel-button';

function ViewButton({ onClick, className, title = null }: ViewButtonType) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(style, className)}
    >
      <p>{ title || format('excel_upload.view_template')}</p>
    </button>
  );
}

export default ViewButton;
