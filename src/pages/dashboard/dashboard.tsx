import React, { useCallback } from 'react';

import { useIntl } from 'react-intl';

function DashboardPage() {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  return (
    
    <p className="w-[200px] h-[100px]">{format('hello')}</p>
  );
}

export default DashboardPage;
