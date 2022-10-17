import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import SimpleImageSlider from 'react-simple-image-slider';

import FormHeader from 'components/shared/FormHeader';
import { IShipmentImages } from 'models/shipment/IShipmentImages';
import SubmitButton from 'shared/buttons/SubmitButton';
import ViewButton from 'shared/buttons/ViewButton';
import { getShipmentImagesRequest, resetShipmentImages } from 'stores/actions/shipmentImages/shipmentImagesActions';
import { RootState } from 'stores/reducers/rootReducer';

import 'styles/imageSlider.css';

function ShipmentImagesDataModal({
  onCancel, title, shipmentId,
}: any) {
  const dispatch = useDispatch();

  const {
    shipmentImages,
  } = useSelector(
    (state: RootState) => state.shipmentImages,
  );

  useEffect(() => {
    dispatch(resetShipmentImages());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadImages = () => {
    dispatch(getShipmentImagesRequest(
      { payload: { shipmentId } },
    ));
  };

  const images = shipmentImages !== undefined
    ? shipmentImages.map((image: IShipmentImages) => ({
      url: image.file,
    }))
    : [];

  return (
    <div className="bg-transit-white w-full rounded-lg pt-4">
      <FormHeader title={title} onClick={onCancel} />
      {images.length > 0 ? (
        <div className="pt-8">
          <SimpleImageSlider
            width={900}
            height={634}
            images={images}
            showBullets
            showNavs
            loop={false}
            navStyle={2}
          />
        </div>
      ) : (
        <div className="pt-8" style={{ width: '900px', height: '634px' }} />
      )}
      <div className="flex justify-between text-lg font-medium gap-6 pb-4 pt-8">
        <SubmitButton onClick={() => {}} className="w-fit" title="Load Customer" />
        <SubmitButton onClick={loadImages} className="w-fit" title="Uploaded Images" />
        <SubmitButton onClick={() => {}} className="w-fit" title="Download Image" />
        <SubmitButton onClick={() => {}} className="w-fit" title="Load EPOD" />
      </div>
      <div className="flex justify-between text-lg font-medium gap-6 pb-4 pt-2">
        <ViewButton onClick={() => {}} className="w-fit" title="Flip left" />
        <ViewButton onClick={() => {}} className="w-fit" title="Flip right" />
      </div>
    </div>
  );
}

export default ShipmentImagesDataModal;
