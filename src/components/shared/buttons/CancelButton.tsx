import React, { useCallback } from 'react';

import classNames from 'classnames';
import { useIntl } from 'react-intl';

import { CancelButtonType } from 'components/shared/buttons/types';

const style = 'cancel-button';

function CancelButton({ onClick, className }: CancelButtonType) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(style, className)}
      data-testid="cancel-button"
    >
      <p>{format('app.cancel')}</p>
    </button>
  );
}

export default CancelButton;
