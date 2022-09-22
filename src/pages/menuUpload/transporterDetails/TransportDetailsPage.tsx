import React, { useCallback } from 'react';

import { useIntl } from 'react-intl';

import PageBody from 'components/shared/PageBody';
import PageHeader from 'pages/types';

import TransporterDetails from './TransporterDetails';
import VehicleDetails from './VehicleDetails';

function TransportDetailsPage() {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  return (
    <PageBody title={format(PageHeader.transporter_details)}>
      <TransporterDetails />
      <VehicleDetails />
    </PageBody>
  );
}

export default TransportDetailsPage;
