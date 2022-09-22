import React, { useCallback } from 'react';

import { Controller } from 'react-hook-form';
import { useIntl } from 'react-intl';

import DriverPicker from 'components/pickers/DriverPicker';
import SupplierPicker from 'components/pickers/SupplierPicker';
import TransporterDetailsPicker from 'components/pickers/TransporterDetailsPicker';
import TransporterPicker from 'components/pickers/TransporterPicker';
import DatePick from 'components/shared/DatePicker';
import ValidationError from 'components/shared/ValidationError';
import Input from 'shared/inputs/input';

function ShipmentBaseData({
  control, register, errors, watch, setValue, mode, initialFormValue,
}: any) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  return (
    <>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-2 w-1/4">
          <p className="text-xs text-transit-black-secondary font-medium required-field">{format('shipment.supplier_name.label')}</p>
          <Controller
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <SupplierPicker
                field={field}
                isInvalid={Boolean(errors.supplier)}
              />
            )}
            name="supplier"
          />
          {errors.supplier && <ValidationError value={format('validation.error.field_required')} />}
        </div>
        <div className="flex flex-col gap-2 w-1/4">
          <p className="text-xs text-transit-black-secondary font-medium required-field">{format('shipment.transporter_name.label')}</p>
          <Controller
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <TransporterPicker
                field={field}
                isInvalid={Boolean(errors.transporter)}
              />
            )}
            name="transporter"
          />
          {errors.transporter && <ValidationError value={format('validation.error.field_required')} />}
        </div>
        <div className="flex flex-col gap-2 w-1/4">
          <p className="text-xs text-transit-black-secondary font-medium required-field">{format('shipment.driver_name.label')}</p>
          <Controller
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <DriverPicker
                field={field}
                isInvalid={Boolean(errors.driver)}
                isShipment
                watch={watch('transporter')}
                setValue={setValue}
                mode={mode}
                initialFormValue={initialFormValue}
              />
            )}
            name="driver"
          />
          {errors.driver && <ValidationError value={format('validation.error.field_required')} />}
        </div>
        <div className="flex flex-col gap-2 w-1/4">
          <p className="text-xs text-transit-black-secondary font-medium required-field">{format('shipment.vehicle_number.label')}</p>
          <Controller
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <TransporterDetailsPicker
                field={field}
                isInvalid={Boolean(errors.transporter_details)}
                isShipment
                watch={watch('transporter')}
                setValue={setValue}
                mode={mode}
                initialFormValue={initialFormValue}
              />
            )}
            name="transporter_details"
          />
          {errors.transporter_details && <ValidationError value={format('validation.error.field_required')} />}
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="flex flex-col gap-2 w-1/4">
          <p className="text-xs text-transit-black-secondary font-medium">{format('shipment.ship_date.label')}</p>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePick
                currentDate={value}
                onChange={onChange}
              />
            )}
            name="ship_date"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/4">
          <p className="text-xs text-transit-black-secondary font-medium">{format('shipment.expected_delivery_date.label')}</p>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePick
                currentDate={value}
                onChange={onChange}
              />
            )}
            name="expected_delivery_date"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/4">
          <p className="text-xs text-transit-black-secondary font-medium">{format('shipment.custom_route_number.label')}</p>
          <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('custom_route_number')}
            name="custom_route_number"
            id="floatingInput"
            placeholder={format('shipment.custom_route_number.label')}
            type="text"
            className="h-9 placeholder-grey-300"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/4">
          <p className="text-xs text-transit-black-secondary font-medium">{format('shipment.ropo_number.label')}</p>
          <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('ropo_number')}
            name="ropo_number"
            id="floatingInput"
            placeholder={format('shipment.ropo_number.label')}
            type="text"
            className="h-9 placeholder-grey-300"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex gap-2 w-1/4">
          <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('delay_justified')}
            name="delay_justified"
            id="floatingInput"
            placeholder=""
            type="checkbox"
            className="h-5 border border-transit-green-dark accent-transit-green-dark"
          />
          <p className="text-xs text-transit-black-secondary text-center font-medium">{format('shipment.delay_justified.label')}</p>
        </div>
        <div className="flex gap-2 w-1/4">
          <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('pod')}
            name="pod"
            id="floatingInput"
            placeholder=""
            type="checkbox"
            className="h-5 border border-transit-green-dark accent-transit-green-dark"
          />
          <p className="text-xs text-transit-black-secondary text-center font-medium">{format('shipment.pod.label')}</p>
        </div>
      </div>
    </>
  );
}

export default ShipmentBaseData;
