import React, { useCallback } from 'react';

import { useIntl } from 'react-intl';

import SubmitButton from 'shared/buttons/SubmitButton';

function ShipmentImagesData() {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  return (
    <>
      <div className="flex justify-end text-lg font-medium gap-2 pb-4">
        <SubmitButton onClick={() => {}} className="w-fit w-1/3" title={format('shipment.customer_images.label')} />
      </div>
      <div className="flex flex-row gap-2" />
    </>
  );
}

export default ShipmentImagesData;
