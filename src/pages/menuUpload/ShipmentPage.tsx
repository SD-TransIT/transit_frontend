import React, { useCallback } from 'react';

import { useIntl } from 'react-intl';

import PageBody from 'components/shared/PageBody';
import PageHeader from 'pages/types';

function ShipmentPage() {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  return (
    <PageBody title={format(PageHeader.shipment)}>{null}</PageBody>
  );
}

export default ShipmentPage;
