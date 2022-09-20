import React, { useCallback, useEffect } from 'react';

import { Controller } from 'react-hook-form';
import { useIntl } from 'react-intl';
import Select, { GroupBase } from 'react-select';

import DatePick from 'components/shared/DatePicker';
import Input from 'shared/inputs/input';

function ShipmentDetailsData({
  control, register, watch, setValue,
}: any) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const deliveryStatusOptions = [
    { value: 'delivered', label: format('shipment.delivery_status.delivered.label') },
    { value: 'not_delivered', label: format('shipment.delivery_status.not_delivered.label') },
  ];

  const podStatusDeliveredOptions = [
    { value: 'pod_signed_complete', label: 'POD signed complete' },
    { value: 'pod_signed_dso', label: 'POD signed DSO' },
    { value: 'other', label: 'Other' },
  ];

  const podStatusNotDeliveredOptions = [
    { value: 'client_not_present', label: 'Client not present' },
    { value: 'accident', label: 'Accident' },
    { value: 'robbery', label: 'Robbery' },
    { value: 'other', label: 'Other' },
  ];

  const deliveryStatus = watch('delivery_status');

  useEffect(() => {
    if (deliveryStatus !== null && deliveryStatus !== undefined) {
      setValue('pod_status', null);
    }
  }, [deliveryStatus, setValue]);

  return (
    <>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-2 w-1/3">
          <p className="text-xs text-transit-black-secondary font-medium">{format('shipment.delivery_status.label')}</p>
          <Controller
            rules={{ required: true }}
            control={control}
            render={({
              field: {
                onChange, value, name, ref,
              },
            }) => (
              <Select<Object, true, GroupBase<Object>>
                name={name}
                ref={ref}
                value={value}
                onChange={onChange}
                options={deliveryStatusOptions}
                placeholder={format('shipment.delivery_status.label')}
              />
            )}
            name="delivery_status"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="text-xs text-transit-black-secondary font-medium">{format('shipment.pod_status.label')}</p>
          <Controller
            rules={{ required: true }}
            control={control}
            render={({
              field: {
                onChange, value, name, ref,
              },
            }) => (
              <Select<Object, true, GroupBase<Object>>
                name={name}
                ref={ref}
                value={value}
                onChange={onChange}
                // eslint-disable-next-line
                options={watch('delivery_status') !== null && watch('delivery_status') !== undefined ? (watch('delivery_status').value === 'delivered' ? podStatusDeliveredOptions : podStatusNotDeliveredOptions) : []}
                placeholder={format('shipment.pod_status.label')}
              />
            )}
            name="pod_status"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="text-xs text-transit-black-secondary font-medium">{format('shipment.signed_by.label')}</p>
          <Input
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('signed_by')}
            name="signed_by"
            id="floatingInput"
            placeholder={format('shipment.signed_by.label')}
            type="text"
            className="h-9 placeholder-grey-300"
          />
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="flex flex-col gap-2 w-1/3">
          <p className="text-xs text-transit-black-secondary font-medium">{format('shipment.delivery_date.label')}</p>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePick
                currentDate={value}
                onChange={onChange}
              />
            )}
            name="delivery_date"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="text-xs text-transit-black-secondary font-medium">{format('shipment.gps_coordinates.label')}</p>
          <Input
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('gps_coordinates')}
            name="gps_coordinates"
            id="floatingInput"
            placeholder={format('shipment.gps_coordinates.label')}
            type="text"
            className="h-9 placeholder-grey-300"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <p className="text-xs text-transit-black-secondary font-medium">{format('shipment.description.label')}</p>
          <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('description')}
            name="description"
            id="floatingInput"
            placeholder={format('shipment.description.label')}
            type="text"
            className="h-9 placeholder-grey-300"
          />
        </div>
      </div>
    </>
  );
}

export default ShipmentDetailsData;
