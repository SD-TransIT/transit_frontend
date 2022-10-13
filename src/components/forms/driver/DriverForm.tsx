import React, { useCallback } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { ManualFormProps } from 'components/forms/types';
import TransporterPicker from 'components/pickers/TransporterPicker';
import ConfirmDeleteMessage from 'components/shared/ConfirmDeleteMessage';
import FormHeader from 'components/shared/FormHeader';
import ValidationError from 'components/shared/ValidationError';
import CancelButton from 'shared/buttons/CancelButton';
import DeleteButton from 'shared/buttons/DeleteButton';
import SubmitButton from 'shared/buttons/SubmitButton';
import Input from 'shared/inputs/input';

function DriverForm({
  onSubmit, onCancel, title, initialFormValue, submitButtonText, mode, onDelete,
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
        { mode === 'Delete' ? (
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
                <div className="flex flex-col gap-2 w-1/2">
                  <p className="text-xs text-transit-black-secondary font-medium required-field">{format('transporter_details.name.label')}</p>
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
                <div className="flex flex-col gap-2 w-1/2">
                  <p className="text-xs text-transit-black-secondary font-medium required-field">{format('shared.driver_name.label')}</p>
                  <Input
                  // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('name', { required: true })}
                    name="name"
                    id="floatingInput"
                    placeholder={format('shared.driver_name.label')}
                    type="text"
                    isInvalid={Boolean(errors.name)}
                  />
                  {errors.name && <ValidationError value={format('validation.error.field_required')} />}
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2 w-1/2">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('driver_master.epod_username.label')}</p>
                  <Input
                  // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('username')}
                    name="username"
                    id="floatingInput"
                    placeholder={format('shared.username.placeholder')}
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2 w-1/2">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('driver_master.epod_password.label')}</p>
                  <Input
                  // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('password')}
                    name="password"
                    id="floatingInput"
                    placeholder={format('shared.password.placeholder')}
                    type="password"
                  />
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

export default DriverForm;
