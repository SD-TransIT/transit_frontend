import React, { useCallback } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import ModeOfTransportPicker from 'components/pickers/ModeOfTransportPicker';
import TransporterPicker from 'components/pickers/TransporterPicker';
import ConfirmDeleteMessage from 'components/shared/ConfirmDeleteMessage';
import FormHeader from 'components/shared/FormHeader';
import ValidationError from 'components/shared/ValidationError';
import CancelButton from 'shared/buttons/CancelButton';
import DeleteButton from 'shared/buttons/DeleteButton';
import SubmitButton from 'shared/buttons/SubmitButton';
import Input from 'shared/inputs/input';

import { ManualFormProps } from '../types';

function TransporterDetailsForm({
  onSubmit, onCancel, title, submitButtonText, initialFormValue, mode, onDelete,
}: ManualFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialFormValue });

  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  return (
    <>
      <div className="bg-transit-white w-full rounded-lg pt-4">
        {mode === 'Delete' ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormHeader title={title} onClick={onCancel} />
              <ConfirmDeleteMessage />
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormHeader title={title} onClick={onCancel} />
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium required-field">{format('transporter_details.transporter_name.label')}</p>
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
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium required-field">{format('transporter_details.mode_of_transport.label')}</p>
                  <Controller
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <ModeOfTransportPicker
                        field={field}
                        isInvalid={Boolean(errors.mode_of_transport)}
                      />
                    )}
                    name="mode_of_transport"
                  />
                  {errors.mode_of_transport && <ValidationError value={format('validation.error.field_required')} />}
                </div>
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('shared.vehicle_number.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('vehicle_number')}
                    name="vehicle_number"
                    id="floatingInput"
                    placeholder={format('shared.vehicle_number.label')}
                    type="text"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('transporter_details.vehicle_volume.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('vehicle_capacity_volume', {
                      validate: (value:any) => value === null || value === '' || value >= 0,
                    })}
                    name="vehicle_capacity_volume"
                    id="floatingInput"
                    placeholder={format('transporter_details.vehicle_volume.label')}
                    type="text"
                    isInvalid={Boolean(errors.vehicle_capacity_volume)}
                  />
                  {errors.vehicle_capacity_volume && errors.vehicle_capacity_volume.type === 'validate' && <ValidationError value={format('validation.error.field_number')} />}
                </div>
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium ">{format('transporter_details.vehicle_weight.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('vehicle_capacity_weight', {
                      validate: (value:any) => value === null || value === '' || value >= 0,
                    })}
                    name="vehicle_capacity_weight"
                    id="floatingInput"
                    placeholder={format('transporter_details.vehicle_weight.label')}
                    type="text"
                    isInvalid={Boolean(errors.vehicle_capacity_weight)}
                  />
                  {errors.vehicle_capacity_weight && errors.vehicle_capacity_weight.type === 'validate' && <ValidationError value={format('validation.error.field_number')} />}
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
      <div className="flex justify-end text-lg font-medium gap-2 pb-4">
        {mode === 'Edit' && <DeleteButton onClick={() => onDelete?.({})} className="absolute left-5 h-fit w-fit" />}
        <CancelButton onClick={onCancel} className="w-fit" />
        <SubmitButton onClick={handleSubmit(onSubmit)} className="w-fit" title={submitButtonText} />
      </div>
    </>
  );
}

export default TransporterDetailsForm;
