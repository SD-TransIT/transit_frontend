import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RiCloseFill } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import Input from '../../../shared/inputs/input';
import ValidationError from '../../shared/ValidationError';
import SubmitButton from '../../../shared/buttons/SubmitButton';
import CancelButton from '../../../shared/buttons/CancelButton';
import { ManualFormProps } from '../types';
import DeleteButton from '../../../shared/buttons/DeleteButton';
import TransporterPicker from '../../pickers/TransporterPicker';

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
              <div className="flex flex-row justify-between">
                <p className="float-left text-[21px] text-transit-black font-semibold">{title}</p>
                <IconContext.Provider
                // eslint-disable-next-line
                value={{ className: 'float-right h-8 w-12 justify-end' }}
                >
                  <RiCloseFill onClick={onCancel} />
                </IconContext.Provider>
              </div>
              <div className="flex flex-col gap-2">
                <p className="float text-left text-[15px] text-transit-black font-medium">Are you sure you want to delete this item?</p>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row justify-between">
                <p className="float-left text-[21px] text-transit-black font-semibold">{title}</p>
                <IconContext.Provider
                  // eslint-disable-next-line
                  value={{ className: 'float-right h-8 w-12 justify-end' }}
                >
                  <RiCloseFill onClick={onCancel} />
                </IconContext.Provider>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs text-transit-black-secondary font-medium required-field">Transporter</p>
                <Controller
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <TransporterPicker
                      field={field}
                    />
                  )}
                  name="transporter"
                />
                {errors.transporter && <ValidationError value="This field is required" />}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs text-transit-black-secondary font-medium required-field">Driver Name</p>
                <Input
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('name', { required: true })}
                  name="name"
                  id="floatingInput"
                  placeholder="Driver Name"
                  type="text"
                  className="h-9 border-transit-grey-300 placeholder-grey-300"
                />
                {errors.name && <ValidationError value="This field is required" />}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs text-transit-black-secondary font-medium">ePOD Username</p>
                <Input
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('username', { required: false })}
                  name="username"
                  id="floatingInput"
                  placeholder="Username"
                  type="text"
                  className="h-9 border-transit-grey-300 placeholder-grey-300"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs text-transit-black-secondary font-medium">ePOD Password</p>
                <Input
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('password', { required: false })}
                  name="password"
                  id="floatingInput"
                  placeholder="Password"
                  type="password"
                  className="h-9 border-transit-grey-300 placeholder-grey-300"
                />
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