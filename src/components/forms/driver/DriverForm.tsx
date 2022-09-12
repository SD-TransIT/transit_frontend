import React from 'react';

import { Controller, useForm } from 'react-hook-form';

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
                <div className="flex flex-col gap-2 w-1/2">
                  <p className="text-xs text-transit-black-secondary font-medium required-field">Driver Name</p>
                  <Input
                  // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('name', { required: true })}
                    name="name"
                    id="floatingInput"
                    placeholder="Driver Name"
                    type="text"
                    className="h-9 placeholder-grey-300"
                    isInvalid={Boolean(errors.name)}
                  />
                  {errors.name && <ValidationError value="This field is required" />}
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2 w-1/2">
                  <p className="text-xs text-transit-black-secondary font-medium">ePOD Username</p>
                  <Input
                  // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('username')}
                    name="username"
                    id="floatingInput"
                    placeholder="Username"
                    type="text"
                    className="h-9 placeholder-grey-300"
                  />
                </div>
                <div className="flex flex-col gap-2 w-1/2">
                  <p className="text-xs text-transit-black-secondary font-medium">ePOD Password</p>
                  <Input
                  // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('password')}
                    name="password"
                    id="floatingInput"
                    placeholder="Password"
                    type="password"
                    className="h-9 placeholder-grey-300"
                  />
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
      <div className="flex justify-end text-lg font-medium gap-2 pb-4">
        { mode === 'Edit' && <DeleteButton onClick={() => onDelete?.({})} className="absolute left-5 h-fit w-fit" title="Delete" /> }
        <CancelButton onClick={onCancel} className="w-fit" />
        <SubmitButton onClick={handleSubmit(onSubmit)} className="w-fit" title={submitButtonText} />
      </div>
    </>
  );
}

export default DriverForm;
