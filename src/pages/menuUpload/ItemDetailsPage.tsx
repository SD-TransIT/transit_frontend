import React, { useCallback } from 'react';

import { useIntl } from 'react-intl';

import PageBody from 'components/shared/PageBody';
import PageHeader from 'pages/types';

function ItemDetailsPage() {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  return (
    <PageBody title={format(PageHeader.item_details)}>{null}</PageBody>
  );
}

export default ItemDetailsPage;
