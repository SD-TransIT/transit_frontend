import React, { useCallback } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import CustomerPicker from 'components/pickers/CustomerPicker';
import ConfirmDeleteMessage from 'components/shared/ConfirmDeleteMessage';
import DatePick from 'components/shared/DatePicker';
import FormHeader from 'components/shared/FormHeader';
import ValidationError from 'components/shared/ValidationError';
import CancelButton from 'shared/buttons/CancelButton';
import DeleteButton from 'shared/buttons/DeleteButton';
import SubmitButton from 'shared/buttons/SubmitButton';

import { ManualFormProps } from '../types';

function OrderDetailsForm({
  onSubmit, onCancel, title, submitButtonText, initialFormValue, mode, onDelete, children,
}: ManualFormProps) {
  const {
    control,
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
                <div className="flex flex-col gap-2 w-1/2">
                  <p className="text-xs text-transit-black-secondary font-medium required-field">{format('customer_type.column.name')}</p>
                  <Controller
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <CustomerPicker
                        field={field}
                        isInvalid={Boolean(errors.customer)}
                      />
                    )}
                    name="customer"
                  />
                  {errors.customer && <ValidationError value={format('validation.error.field_required')} />}
                </div>
                <div className="flex flex-col gap-2 w-1/2">
                  <p className="text-xs text-transit-black-secondary font-medium required-field">{format('order_details.received_date.label')}</p>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <DatePick
                        // @ts-ignore
                        currentDate={value}
                        onChange={onChange}
                      />
                    )}
                    name="order_received_date"
                  />
                  {errors.order_received_date && <ValidationError value={format('validation.error.field_required')} />}
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
      {children}
      <div className="flex justify-end text-lg font-medium gap-2 pb-4">
        {mode === 'Edit' && <DeleteButton onClick={() => onDelete?.({})} className="absolute left-5 h-fit w-fit" />}
        <CancelButton onClick={onCancel} className="w-fit" />
        <SubmitButton onClick={handleSubmit(onSubmit)} className="w-fit" title={submitButtonText} />
      </div>
    </>
  );
}

export default OrderDetailsForm;
