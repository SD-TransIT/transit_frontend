import React, { useCallback, useState } from 'react';

import { FieldValues, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import FormHeader from 'components/shared/FormHeader';
import { Paths } from 'routes/paths';
import {
  postShipmentRequest,
  putShipmentRequest,
} from 'stores/actions/shipment/shipmentActions';
import {
  addShipmentPhoto,
  shipmentUrl,
} from 'stores/sagas/shipmentSaga';
import refreshAccessToken from 'stores/sagas/utils';
import { PostShipmentRequestPayload, PutShipmentRequestPayload } from 'stores/types/shipmentType';
import { postRequest } from 'utils/apiClient';

import CancelButton from '../../shared/buttons/CancelButton';
import DeleteButton from '../../shared/buttons/DeleteButton';
import SubmitButton from '../../shared/buttons/SubmitButton';

import ShipmentBaseData from './ShipmentBaseData';
import ShipmentDetailsData from './ShipmentDetailsData';
import ShipmentImagesData from './ShipmentImagesData';
import ShipmentOrderData from './ShipmentOrderData';
import ShipmentFormType from './types';

function ShipmentForm({
  onCancel, title, submitButtonText, initialFormValue, mode, onDelete, initialOrderDetails,
}: ShipmentFormType) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({ defaultValues: initialFormValue });

  const [orderDetails, setOrderDetails] = useState<object []>(initialOrderDetails);

  const onOrderDetailAdd = (formValues: FieldValues) => {
    const tempOrderDetails: object [] = orderDetails;
    tempOrderDetails.push(formValues.order_details);
    setOrderDetails(tempOrderDetails);
  };

  const onOrderDetailDelete = (object: FieldValues) => {
    const arrayDeleted = orderDetails.filter(
      (order: any) => order.order_details_id !== object.order_details_id,
    );
    setOrderDetails(arrayDeleted);
  };

  const createMultipleShipments = async (
    payload: FieldValues,
  ) => {
    await refreshAccessToken();
    const responsePost = await postRequest(shipmentUrl, payload);
    await addShipmentPhoto(responsePost.id, payload.shipment_image);
  };

  const formatShipmentPayload = (formValues: FieldValues, orders: string []) => {
    const payload = { ...formValues };
    payload.driver = formValues.driver.id;
    payload.transporter_details = formValues.transporter_details.id;
    payload.supplier = formValues.supplier.id;
    payload.delivery_status = formValues.delivery_status.value;
    payload.pod_status = formValues.pod_status.value;
    payload.orders = orders;
    if (mode === 'Edit') {
      payload.id = initialFormValue.id;
      delete payload.order_ids;
      delete payload.order_names;
    }
    return payload;
  };

  const onSubmitAdd = async (formValues: FieldValues) => {
    const customers = Array.from(new Set(orderDetails.map((row: any) => (row.customer))));
    if (customers.length > 1) {
      customers.forEach(async (customerId, index) => {
        const orders = orderDetails
          .filter((order: any) => order.customer === customerId)
          .map((row: any) => (row.order_details_id));
        const payload = formatShipmentPayload(formValues, orders);
        await createMultipleShipments(payload);
        if (index === customers.length - 1) {
          window.localStorage.setItem('stateType', JSON.stringify(''));
          navigate(`${Paths.shipment_details}`);
        }
      });
    } else {
      const orders = orderDetails.map((row: any) => (row.order_details_id));
      const payload = formatShipmentPayload(formValues, orders);
      dispatch(postShipmentRequest(payload as PostShipmentRequestPayload));
      window.localStorage.setItem('stateType', JSON.stringify(''));
      navigate(`${Paths.shipment_details}`);
    }
  };
  const onSubmitEdit = async (formValues: FieldValues) => {
    const orders = orderDetails.map((row: any) => (row.order_details_id));
    const payload = formatShipmentPayload(formValues, orders);
    dispatch(putShipmentRequest(payload as PutShipmentRequestPayload));
    window.localStorage.setItem('stateType', JSON.stringify(''));
    navigate(`${Paths.shipment_details}`);
  };

  const onSubmit = async (formValues: FieldValues) => {
    if (mode === 'Add') {
      onSubmitAdd(formValues);
    } else {
      onSubmitEdit(formValues);
    }
  };

  return (
    <div className="bg-transit-white w-full pt-8 px-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <FormHeader title={title} />
          <ShipmentBaseData
            control={control}
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            mode={mode}
            initialFormValue={initialFormValue}
          />
          <ShipmentOrderData
            onOrderDetailAdd={onOrderDetailAdd}
            onOrderDetailDelete={onOrderDetailDelete}
            orderDetails={orderDetails}
            mode={mode}
          />
          <p className="text-left text-lg text-transit-black font-semibold">{format('shipment.delivery_details.label')}</p>
          <ShipmentDetailsData
            control={control}
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            mode={mode}
            initialFormValue={initialFormValue}
          />
          <p className="text-left text-lg text-transit-black font-semibold" />
          <ShipmentImagesData
            register={register}
            mode={mode}
            title={format('shipment.customer_images.label')}
            shipmentId={initialFormValue?.id ?? null}
          />
        </div>
      </form>
      <div className="flex justify-between text-lg font-medium gap-2 pb-4">
        {mode === 'Edit' && <DeleteButton onClick={() => onDelete?.({})} />}
        <div className="flex flex-row gap-2 justify-end w-full">
          <CancelButton onClick={onCancel} className="w-fit" />
          <SubmitButton onClick={handleSubmit(onSubmit)} className="w-fit" title={submitButtonText} />
        </div>
      </div>
    </div>
  );
}

export default ShipmentForm;
