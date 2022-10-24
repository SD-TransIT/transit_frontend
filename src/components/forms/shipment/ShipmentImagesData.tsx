import React, { useCallback, useState } from 'react';

import { useIntl } from 'react-intl';

import SubmitButton from 'components/shared/buttons/SubmitButton';
import Dialog from 'components/shared/dialog/Dialog';
import Input from 'components/shared/inputs/input';

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
      <div className="flex justify-between items-center text-lg font-medium gap-2 pb-4">
        <Input
            // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('shipment_image')}
          {...{ accept: 'image/*' }}
          name="shipment_image"
          id="fileBrowser"
          type="file"
        />
        <SubmitButton onClick={mode === 'Edit' ? toggleShowImagesModal : () => {}} className="w-1/3" title={format('shipment.customer_images.label')} />
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
