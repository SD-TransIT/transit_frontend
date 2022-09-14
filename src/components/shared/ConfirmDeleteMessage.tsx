import React, { useCallback } from 'react';

import { useIntl } from 'react-intl';

function ConfirmDeleteMessage() {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  return (
    <div className="flex flex-col gap-2">
      <p className="float text-left text-[15px] text-transit-black font-medium">{format('app.confirm.message')}</p>
    </div>
  );
}

export default ConfirmDeleteMessage;
