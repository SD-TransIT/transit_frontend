import React, { useCallback, useState } from 'react';

import { useIntl } from 'react-intl';

import SubmitButton from 'shared/buttons/SubmitButton';
import Dialog from 'shared/dialog/Dialog';
import Input from 'shared/inputs/input';

import ShipmentImagesDataModal from './ShipmentImagesDataModal';

import 'styles/fileBrowser.css';

function ShipmentImagesData({
  register, title, shipmentId, mode,
}: any) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const [displayShowImagesModal, setDisplayShowImagesModal] = useState(false);

  const toggleShowImagesModal = () => {
    setDisplayShowImagesModal(!displayShowImagesModal);
  };

  return (
    <>
      <div className="flex justify-between text-lg font-medium gap-2 pb-4">
        <Input
            // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('shipment_image')}
          {...{ accept: 'image/*' }}
          name="shipment_image"
          id="fileBrowser"
          type="file"
        />
        <SubmitButton onClick={mode === 'Edit' ? toggleShowImagesModal : () => {}} className="w-fit w-1/3" title={format('shipment.customer_images.label')} />
      </div>
      <div className="flex flex-row gap-2" />
      <Dialog
        isOpen={displayShowImagesModal}
        onClose={toggleShowImagesModal}
        setCustomDialogContent
        // eslint-disable-next-line
        children={[
          <ShipmentImagesDataModal
            onCancel={toggleShowImagesModal}
            title={title}
            shipmentId={shipmentId}
          />,
        ]}
      />
    </>
  );
}

export default ShipmentImagesData;
