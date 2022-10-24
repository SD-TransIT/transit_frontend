import React, { useCallback } from 'react';

import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { ManualFormProps } from 'components/forms/types';
import CancelButton from 'components/shared/buttons/CancelButton';
import DeleteButton from 'components/shared/buttons/DeleteButton';
import SubmitButton from 'components/shared/buttons/SubmitButton';
import ConfirmDeleteMessage from 'components/shared/ConfirmDeleteMessage';
import FormHeader from 'components/shared/FormHeader';
import Input from 'components/shared/inputs/input';
import ValidationError from 'components/shared/ValidationError';

function CustomerTypeForm({
  onSubmit, onCancel, title, initialFormValue, submitButtonText, mode, onDelete,
}: ManualFormProps) {
  const {
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
              <div className="flex flex-col gap-2">
                <p className="text-xs text-transit-black-secondary font-medium required-field">{format('customer_type.name.label')}</p>
                <Input
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('customer_type_name', { required: true })}
                  name="customer_type_name"
                  id="floatingInput"
                  placeholder={format('customer_type.name.label')}
                  type="text"
                  isInvalid={Boolean(errors.customer_type_name)}
                />
                {errors.customer_type_name && <ValidationError value={format('validation.error.field_required')} />}
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

export default CustomerTypeForm;
