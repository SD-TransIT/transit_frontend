import React, { useCallback } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import ShipmentPicker from 'components/pickers/ShipmentPicker';
import ConfirmDeleteMessage from 'components/shared/ConfirmDeleteMessage';
import FormHeader from 'components/shared/FormHeader';
import ValidationError from 'components/shared/ValidationError';
import CancelButton from 'shared/buttons/CancelButton';
import DeleteButton from 'shared/buttons/DeleteButton';
import SubmitButton from 'shared/buttons/SubmitButton';
import Input from 'shared/inputs/input';

import { ManualFormProps } from '../types';

import PodVarianceDetailsForm from './PodVarianceDetailsForm';

function PodVarianceForm({
  onSubmit, onCancel, onDelete, title, submitButtonText, initialFormValue, mode,
}: ManualFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({ defaultValues: initialFormValue });

  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  return (
    <>
      <div className="bg-transit-white w-full rounded-lg pt-4 gap-4">
        {mode === 'Delete' ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormHeader title={title} onClick={onCancel} />
              <ConfirmDeleteMessage />
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 pb-6">
              <FormHeader title={title} onClick={onCancel} />
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2 w-1/2">
                  <p className="text-xs text-transit-black-secondary font-medium required-field">{format('pod_variance.shipment.label')}</p>
                  <Controller
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <ShipmentPicker
                        field={field}
                        isInvalid={Boolean(errors.shipment)}
                        isDisabled={mode === 'Edit'}
                      />
                    )}
                    name="shipment"
                  />
                  {errors.shipment && <ValidationError value={format('validation.error.field_required')} />}
                </div>
                <div className="flex flex-col gap-2 w-1/2">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('pod_variance.description_dso.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('dso_type')}
                    name="dso_type"
                    id="floatingInput"
                    placeholder={format('pod_variance.description_dso.label')}
                    type="text"
                  />
                </div>
              </div>
              <Input
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('pod_variance_details')}
                name="pod_variance_details"
                id="floatingInput"
                type="hidden"
              />
            </div>
            {
              watch('shipment') !== undefined && (
              <PodVarianceDetailsForm
                shipment={watch('shipment')}
                setValue={setValue}
                mode={mode}
                initialFormValue={initialFormValue}
              />
              )
            }
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

export default PodVarianceForm;