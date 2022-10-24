import React, { useCallback } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import TransporterPicker from 'components/pickers/TransporterPicker';
import CancelButton from 'components/shared/buttons/CancelButton';
import SubmitButton from 'components/shared/buttons/SubmitButton';
import FormHeader from 'components/shared/FormHeader';
import Input from 'components/shared/inputs/input';
import ValidationError from 'components/shared/ValidationError';

import { ManualFormProps } from '../types';

import CostAddDetailForm from './costAddDetailForm';

function CostForm({
  onSubmit, onCancel, title, submitButtonText, initialFormValue, mode,
}: ManualFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm({ defaultValues: initialFormValue });

  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  return (
    <>
      <div className="bg-transit-white w-full rounded-lg pt-4 gap-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 pb-6">
            <FormHeader title={title} onClick={onCancel} />
            <div className="flex flex-row gap-2">
              { mode === 'Add' && (
              <div className="flex flex-col gap-2 w-1/4">
                <p className="text-xs text-transit-black-secondary font-medium required-field">{format('shared.transporter_name.label')}</p>
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
              )}
              <div className={`flex flex-col gap-2 ${mode === 'Edit' ? 'w-1/3' : 'w-1/4'}`}>
                <p className="text-xs text-transit-black-secondary font-medium required-field">{format('cost.transporter_base_cost.label')}</p>
                <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('transporter_base_cost', {
                    required: format('validation.error.field_required'),
                    pattern: {
                      value: /\d+/,
                      message: format('validation.error.field_number'),
                    },
                  })}
                  name="transporter_base_cost"
                  id="floatingInput"
                  placeholder={format('cost.transporter_base_cost.label')}
                  type="text"
                  isInvalid={Boolean(errors.transporter_base_cost)}
                />
                {
                  errors.transporter_base_cost
                  /* @ts-ignore */
                  && <ValidationError value={errors.transporter_base_cost.message} />
                }
              </div>
              <div className={`flex flex-col gap-2 ${mode === 'Edit' ? 'w-1/3' : 'w-1/4'}`}>
                <p className="text-xs text-transit-black-secondary font-medium">{format('cost.transporter_additional_cost.label')}</p>
                <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('transporter_additional_cost', {
                    pattern: {
                      value: /\d+/,
                      message: format('validation.error.field_number'),
                    },
                  })}
                  name="transporter_additional_cost"
                  id="floatingInput"
                  placeholder={format('cost.transporter_additional_cost.label')}
                  type="text"
                  isInvalid={Boolean(errors.transporter_additional_cost)}
                />
                {
                  errors.transporter_additional_cost
                  /* @ts-ignore */
                  && <ValidationError value={errors.transporter_additional_cost.message} />
                }
              </div>
              <div className={`flex flex-col gap-2 ${mode === 'Edit' ? 'w-1/3' : 'w-1/4'}`}>
                <p className="text-xs text-transit-black-secondary font-medium">{format('cost.distance.label')}</p>
                <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('number_of_kilometers', {
                    pattern: {
                      value: /\d+/,
                      message: format('validation.error.field_number'),
                    },
                  })}
                  name="number_of_kilometers"
                  id="floatingInput"
                  placeholder={format('cost.distance.label')}
                  type="text"
                  isInvalid={Boolean(errors.number_of_kilometers)}
                />
                {
                  errors.number_of_kilometers
                  /* @ts-ignore */
                  && <ValidationError value={errors.number_of_kilometers.message} />
                }
              </div>
            </div>
          </div>
          {
              mode === 'Add' && watch('transporter') !== undefined && (
              <CostAddDetailForm
                transporter={watch('transporter')}
                setValue={setValue}
                register={register}
                getValues={getValues}
              />
              )
            }
        </form>
      </div>
      <div className="flex justify-end text-lg font-medium gap-2 pb-4">
        <CancelButton onClick={onCancel} className="w-fit" />
        <SubmitButton onClick={handleSubmit(onSubmit)} className="w-fit" title={submitButtonText} />
      </div>
    </>
  );
}

export default CostForm;
