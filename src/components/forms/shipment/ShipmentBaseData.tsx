import React from 'react';

import { Controller } from 'react-hook-form';

import TransporterPicker from 'components/pickers/TransporterPicker';
import DatePick from 'components/shared/DatePicker';
import ValidationError from 'components/shared/ValidationError';
import Input from 'shared/inputs/input';

function ShipmentBaseData({
  control, register, errors,
}: any) {
  return (
    <>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-2 w-1/4">
          <p className="text-xs text-transit-black-secondary font-medium required-field">Transporter</p>
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
          {errors.transporter && <ValidationError value="This field is required" />}
        </div>
        <div className="flex flex-col gap-2 w-1/4">
          <p className="text-xs text-transit-black-secondary font-medium required-field">Transporter</p>
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
          {errors.transporter && <ValidationError value="This field is required" />}
        </div>
        <div className="flex flex-col gap-2 w-1/4">
          <p className="text-xs text-transit-black-secondary font-medium required-field">Transporter</p>
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
          {errors.transporter && <ValidationError value="This field is required" />}
        </div>
        <div className="flex flex-col gap-2 w-1/4">
          <p className="text-xs text-transit-black-secondary font-medium required-field">Transporter</p>
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
          {errors.transporter && <ValidationError value="This field is required" />}
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="flex flex-col gap-2 w-1/4">
          <p className="text-xs text-transit-black-secondary font-medium">Shipment Date</p>
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
          <p className="text-xs text-transit-black-secondary font-medium">Expected Delivery Date</p>
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
          <p className="text-xs text-transit-black-secondary font-medium">Custom Route Number</p>
          <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('custom_route_number')}
            name="custom_route_number"
            id="floatingInput"
            placeholder="Custom Route Number"
            type="text"
            className="h-9 placeholder-grey-300"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/4">
          <p className="text-xs text-transit-black-secondary font-medium">RO/PO Number</p>
          <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('ropo_number')}
            name="ropo_number"
            id="floatingInput"
            placeholder=" RO/PO Number"
            type="text"
            className="h-9 placeholder-grey-300"
          />
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="flex flex-col gap-2 w-1/4">
          <p className="text-xs text-transit-black-secondary text-center font-medium">Delay Justified</p>
          <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('delay_justified')}
            name="delay_justified"
            id="floatingInput"
            placeholder=""
            type="checkbox"
            className="h-5 border border-transit-green-dark accent-transit-green-dark"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/4">
          <p className="text-xs text-transit-black-secondary text-center font-medium">Paper Based POD Received</p>
          <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('pod')}
            name="pod"
            id="floatingInput"
            placeholder=""
            type="checkbox"
            className="h-5 border border-transit-green-dark accent-transit-green-dark"
          />
        </div>
      </div>
    </>
  );
}

export default ShipmentBaseData;
