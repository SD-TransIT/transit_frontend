import React, { useState } from 'react';

import { FieldValues, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import FormHeader from 'components/shared/FormHeader';
import { Paths } from 'routes/paths';
import { postShipmentRequest } from 'stores/actions/shipment/shipmentActions';
import { shipmentUrl } from 'stores/sagas/shipmentSaga';
import refreshAccessToken from 'stores/sagas/utils';
import { PostShipmentRequestPayload } from 'stores/types/shipmentType';
import { postRequest } from 'utils/apiClient';

import CancelButton from '../../../shared/buttons/CancelButton';
import DeleteButton from '../../../shared/buttons/DeleteButton';
import SubmitButton from '../../../shared/buttons/SubmitButton';

import ShipmentBaseData from './ShipmentBaseData';
import ShipmentDetailsData from './ShipmentDetailsData';
import ShipmentImagesData from './ShipmentImagesData';
import ShipmentOrderData from './ShipmentOrderData';
import ShipmentFormType from './types';

function ShipmentForm({
  onCancel, title, submitButtonText, initialFormValue, mode, onDelete,
}: ShipmentFormType) {
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

  const [orderDetails, setOrderDetails] = useState<object []>([]);

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
    await postRequest(shipmentUrl, payload);
  };

  const formatShipmentPayload = (formValues: FieldValues, orders: string []) => {
    const payload = { ...formValues };
    payload.driver = formValues.driver.id;
    payload.transporter_details = formValues.transporter_details.id;
    payload.supplier = formValues.supplier.id;
    payload.delivery_status = formValues.delivery_status.value;
    payload.pod_status = formValues.pod_status.value;
    payload.orders = orders;
    return payload;
  };

  const onSubmit = async (formValues: FieldValues) => {
    const customers = Array.from(new Set(orderDetails.map((row: any) => (row.customer))));
    if (customers.length > 1) {
      customers.forEach(async (customerId, index) => {
        const orders = orderDetails
          .filter((order: any) => order.customer === customerId)
          .map((row: any) => (row.order_details_id));
        const payload = formatShipmentPayload(formValues, orders);
        await createMultipleShipments(payload);
        if (index === customers.length - 1) {
          navigate(`${Paths.shipment_details}`);
        }
      });
    } else {
      const orders = orderDetails.map((row: any) => (row.order_details_id));
      const payload = formatShipmentPayload(formValues, orders);
      dispatch(postShipmentRequest(payload as PostShipmentRequestPayload));
      navigate(`${Paths.shipment_details}`);
    }
  };

  return (
    <div className="bg-transit-white w-full rounded-lg pt-8 px-4" style={{ width: '75%', margin: '0 auto' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <FormHeader title={title} onClick={onCancel} />
          <ShipmentBaseData
            control={control}
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
          <ShipmentOrderData
            control={control}
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            onOrderDetailAdd={onOrderDetailAdd}
            onOrderDetailDelete={onOrderDetailDelete}
            orderDetails={orderDetails}
          />
          <p className="float-left text-[21px] text-transit-black font-semibold">Delivery Details</p>
          <ShipmentDetailsData
            control={control}
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
          <p className="float-left text-[21px] text-transit-black font-semibold" />
          <ShipmentImagesData />
        </div>
      </form>
      <div className="flex justify-end text-lg font-medium gap-2 pb-4">
        { mode === 'Edit' && <DeleteButton onClick={() => onDelete?.({})} className="absolute left-5 h-fit w-fit" /> }
        <CancelButton onClick={onCancel} className="w-fit" />
        <SubmitButton onClick={handleSubmit(onSubmit)} className="w-fit" title={submitButtonText} />
      </div>
    </div>
  );
}

export default ShipmentForm;
