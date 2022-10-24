import React, { useCallback } from 'react';

import classNames from 'classnames';
import { RiDownloadLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { DownloadButtonType } from 'components/shared/buttons/types';

const style = 'cancel-button';

function DownloadButton({ onClick, className }: DownloadButtonType) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(style, className)}
      data-testid="download-button"
    >
      <RiDownloadLine />
      <p>{format('report.download_excel.label')}</p>
    </button>
  );
}

export default DownloadButton;
