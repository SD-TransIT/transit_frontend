import React from 'react';

import { useForm } from 'react-hook-form';

import FormHeader from 'components/shared/FormHeader';

import CancelButton from '../../../shared/buttons/CancelButton';
import DeleteButton from '../../../shared/buttons/DeleteButton';
import SubmitButton from '../../../shared/buttons/SubmitButton';

import ShipmentBaseData from './ShipmentBaseData';
import ShipmentFormType from './types';

function ShipmentForm({
  onSubmit, onCancel, title, submitButtonText, initialFormValue, mode, onDelete,
}: ShipmentFormType) {
  const {
    control,
    register,
    handleSubmit,
    // eslint-disable-next-line
    formState: { errors },
  } = useForm({ defaultValues: initialFormValue });

  return (
    <>
      <div className="bg-transit-white w-full rounded-lg pt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <FormHeader title={title} onClick={onCancel} />
            <ShipmentBaseData
              control={control}
              register={register}
              errors={errors}
            />

          </div>
        </form>
      </div>
      <div className="flex justify-end text-lg font-medium gap-2 pb-4">
        { mode === 'Edit' && <DeleteButton onClick={() => onDelete?.({})} className="absolute left-5 h-fit w-fit" title="Delete" /> }
        <CancelButton onClick={onCancel} className="w-fit" />
        <SubmitButton onClick={handleSubmit(onSubmit)} className="w-fit" title={submitButtonText} />
      </div>
    </>
  );
}

export default ShipmentForm;