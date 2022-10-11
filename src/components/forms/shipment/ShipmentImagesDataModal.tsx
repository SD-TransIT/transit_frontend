import React from 'react';

import FormHeader from 'components/shared/FormHeader';

function ShipmentImagesDataModal({
  onCancel, title,
}: any) {
  return (
    <div className="bg-transit-white w-full rounded-lg pt-4">
      <FormHeader title={title} onClick={onCancel} />
    </div>
  );
}

export default ShipmentImagesDataModal;
