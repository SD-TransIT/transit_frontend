import React, { useCallback, useEffect } from 'react';

import { useIntl } from 'react-intl';

import SubmitButton from 'shared/buttons/SubmitButton';

function ShipmentImagesData({
  control, register, errors, watch, setValue,
}: any) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  return (
    <>
      <div className="flex justify-end text-lg font-medium gap-2 pb-4">
        <SubmitButton onClick={() => { console.log('clicked'); }} className="w-fit w-1/3" title="Customer images" />
      </div>
      <div className="flex flex-row gap-2" />
    </>
  );
}

export default ShipmentImagesData;
