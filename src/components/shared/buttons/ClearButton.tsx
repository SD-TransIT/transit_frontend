import React, { useCallback } from 'react';

import classNames from 'classnames';
import { useIntl } from 'react-intl';

import { ClearButtonType } from 'components/shared/buttons/types';

const style = 'clear-button';

function ClearButton({ onClick, className }: ClearButtonType) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(style, className)}
      data-testid="clear-button"
    >
      <p className="text-center">{format('search.clear')}</p>
    </button>
  );
}

export default ClearButton;
