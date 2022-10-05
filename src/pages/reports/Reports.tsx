import React, { useCallback } from 'react';

import { useIntl } from 'react-intl';

import PageBody from 'components/shared/PageBody';

import RaportGenerator from './ReportsGenerator';

function ReportsPage() {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  return (
    <PageBody title={format('app.reports.label')}>
      <div className="p-4 bg-transit-white">
        <RaportGenerator />
      </div>
    </PageBody>
  );
}

export default ReportsPage;
