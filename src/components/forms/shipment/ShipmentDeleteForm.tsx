import React from 'react';

import { useForm } from 'react-hook-form';

import { ManualFormProps } from 'components/forms/types';
import CancelButton from 'components/shared/buttons/CancelButton';
import SubmitButton from 'components/shared/buttons/SubmitButton';
import ConfirmDeleteMessage from 'components/shared/ConfirmDeleteMessage';
import FormHeader from 'components/shared/FormHeader';

function ShipmentDeleteForm({
  onSubmit, onCancel, title, initialFormValue, submitButtonText,
}: ManualFormProps) {
  const {
    handleSubmit,
  } = useForm({ defaultValues: initialFormValue });

  return (
    <>
      <div className="bg-transit-white w-full rounded-lg pt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <FormHeader title={title} onClick={onCancel} />
            <ConfirmDeleteMessage />
          </div>
        </form>
      </div>
      <div className="flex justify-end text-lg font-medium gap-2 pb-4">
        <CancelButton onClick={onCancel} className="w-fit" />
        <SubmitButton onClick={handleSubmit(onSubmit)} className="w-fit" title={submitButtonText} />
      </div>
    </>
  );
}

export default ShipmentDeleteForm;
