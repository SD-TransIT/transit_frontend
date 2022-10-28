import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import SimpleImageSlider from 'react-simple-image-slider';

import SubmitButton from 'components/shared/buttons/SubmitButton';
import ViewButton from 'components/shared/buttons/ViewButton';
import FormHeader from 'components/shared/FormHeader';
import { IShipmentImages } from 'models/shipment/IShipmentImages';
import { getShipmentImagesRequest, resetShipmentImages } from 'stores/actions/shipmentImages/shipmentImagesActions';
import { RootState } from 'stores/reducers/rootReducer';
import { imagesZipName } from 'utils/consts';
import saveZip from 'utils/saveZip';

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

  const [degree, setDegree] = useState<number>(0);

  useEffect(() => {
    dispatch(resetShipmentImages());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadImages = () => {
    dispatch(getShipmentImagesRequest(
      { payload: { shipmentId } },
    ));
    window.localStorage.setItem('stateType', JSON.stringify(''));
  };

  const images = shipmentImages !== undefined
    ? shipmentImages.map((image: IShipmentImages) => ({
      url: image.file,
    }))
    : [];

  const downloadZip = () => {
    if (images.length > 0) {
      saveZip(imagesZipName, images);
    }
  };

  const flipLeft = () => {
    if (images.length > 0) {
      setDegree(degree - 90);
      const containerDiv: any = document.getElementsByClassName('rsis-container')[0];
      containerDiv.style.transform = `rotate(${degree - 90}deg)`;
    }
  };

  const flipRight = () => {
    if (images.length > 0) {
      setDegree(degree + 90);
      const containerDiv: any = document.getElementsByClassName('rsis-container')[0];
      containerDiv.style.transform = `rotate(${degree + 90}deg)`;
    }
  };

  return (
    <div className="bg-transit-white w-full rounded-lg pt-4">
      <FormHeader title={title} onClick={onCancel} />
      {images.length > 0 ? (
        <div id="photo-container" className="pt-8 flex justify-center">
          <SimpleImageSlider
            width={880}
            height={550}
            images={images}
            showBullets
            showNavs
            loop={false}
            navStyle={2}
          />
        </div>
      ) : (
        <div className="pt-8" style={{ width: '880px', height: '550px' }} />
      )}
      <div className="flex justify-between text-lg font-medium gap-6 pb-4 pt-8">
        <SubmitButton onClick={() => {}} className="w-fit" title="Load Customer" />
        <SubmitButton onClick={loadImages} className="w-fit" title="Uploaded Images" />
        <SubmitButton onClick={downloadZip} className="w-fit" title="Download Image" />
        <SubmitButton onClick={() => {}} className="w-fit" title="Load EPOD" />
      </div>
      <div className="flex justify-between text-lg font-medium gap-6 pb-4 pt-2">
        <ViewButton onClick={flipLeft} className="w-fit" title="Flip left" />
        <ViewButton onClick={flipRight} className="w-fit" title="Flip right" />
      </div>
    </div>
  );
}

export default ShipmentImagesDataModal;
