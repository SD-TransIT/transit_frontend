import React, { useCallback, useState } from 'react';

import { FieldValues, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import FormHeader from 'components/shared/FormHeader';
import { Paths } from 'routes/paths';
import { postShipmentRequest } from 'stores/actions/shipment/shipmentActions';
import { shipmentUrl } from 'stores/sagas/shipmentSaga';
import refreshAccessToken from 'stores/sagas/utils';
import { PostShipmentRequestPayload } from 'stores/types/shipmentType';
import { postRequest, putRequest } from 'utils/apiClient';

import CancelButton from '../../../shared/buttons/CancelButton';
import DeleteButton from '../../../shared/buttons/DeleteButton';
import SubmitButton from '../../../shared/buttons/SubmitButton';

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
    await postRequest(shipmentUrl, payload);
  };

  const updateShipment = async (
    payload: FieldValues,
  ) => {
    await refreshAccessToken();
    await putRequest(
      shipmentUrl,
      payload,
      payload.id,
    );
  };

  const updateShipmentOrders = async (
    id: number,
    orders: any,
  ) => {
    const orderPayload = { orders };
    if (orderPayload.orders.length > 0) {
      await refreshAccessToken();
      await postRequest(
        `/shipment_details_orders/${id}/add_orders_to_shipment/`,
        orderPayload,
      );
    }
  };

  const formatShipmentPayload = (formValues: FieldValues, orders: string []) => {
    const payload = { ...formValues };
    payload.driver = formValues.driver.id;
    payload.transporter_details = formValues.transporter_details.id;
    payload.supplier = formValues.supplier.id;
    payload.delivery_status = formValues.delivery_status.value;
    payload.pod_status = formValues.pod_status.value;
    if (mode === 'Add') {
      payload.orders = orders;
    } else {
      payload.id = initialFormValue.id;
      delete payload.order_ids;
      delete payload.order_names;
      delete payload.orders;
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

  const onSubmitEdit = async (formValues: FieldValues) => {
    const orders = orderDetails.map((row: any) => (row.order_details_id));
    const payload = formatShipmentPayload(formValues, orders);
    await updateShipment(payload);
    await updateShipmentOrders(payload.id, orders);
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
    <div className="bg-transit-white w-3/4 m-auto rounded-lg pt-8 px-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <FormHeader title={title} onClick={onCancel} />
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
          <p className="float-left text-[18px] text-transit-black font-semibold">{format('shipment.delivery_details.label')}</p>
          <ShipmentDetailsData
            control={control}
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            mode={mode}
            initialFormValue={initialFormValue}
          />
          <p className="float-left text-[18px] text-transit-black font-semibold" />
          <ShipmentImagesData />
        </div>
      </form>
      <div className="flex justify-end text-lg font-medium gap-2 pb-4">
        { mode === 'Edit' && <DeleteButton onClick={() => onDelete?.({})} className="left-5 h-fit w-fit" /> }
        <CancelButton onClick={onCancel} className="w-fit" />
        <SubmitButton onClick={handleSubmit(onSubmit)} className="w-fit" title={submitButtonText} />
      </div>
    </div>
  );
}

export default ShipmentForm;
