import React, { useCallback } from 'react';

import { useIntl } from 'react-intl';

import SubmitButton from 'shared/buttons/SubmitButton';
import Input from 'shared/inputs/input';

function ShipmentImagesData({
  register,
}: any) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  return (
    <>
      <div className="flex justify-between text-lg font-medium gap-2 pb-4">
        <Input
            // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('shipment_image')}
          {...{ accept: 'image/*' }}
          name="shipment_image"
          id="floatingInput"
          type="file"
        />
        <SubmitButton onClick={() => {}} className="w-fit w-1/3" title={format('shipment.customer_images.label')} />
      </div>
      <div className="flex flex-row gap-2" />
    </>
  );
}

export default ShipmentImagesData;
