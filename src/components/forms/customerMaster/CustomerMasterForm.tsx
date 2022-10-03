import React, { useCallback } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import CustomerTypePicker from 'components/pickers/CustomerTypePicker';
import ConfirmDeleteMessage from 'components/shared/ConfirmDeleteMessage';
import FormHeader from 'components/shared/FormHeader';
import ValidationError from 'components/shared/ValidationError';
import CancelButton from 'shared/buttons/CancelButton';
import DeleteButton from 'shared/buttons/DeleteButton';
import SubmitButton from 'shared/buttons/SubmitButton';
import Input from 'shared/inputs/input';

import { ManualFormProps } from '../types';

function CustomerMasterForm({
  onSubmit, onCancel, title, submitButtonText, initialFormValue, mode, onDelete, children,
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
                <div className="flex flex-col gap-2 w-1/4">
                  <p className="text-xs text-transit-black-secondary font-medium required-field">{format('customer_type')}</p>
                  <Controller
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <CustomerTypePicker
                        field={field}
                        isInvalid={Boolean(errors.customer_type)}
                      />
                    )}
                    name="customer_type"
                  />
                  {errors.customer_type && <ValidationError value={format('validation.error.field_required')} />}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium required-field">{format('customer_type.column.name')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('name', { required: true })}
                    name="name"
                    id="floatingInput"
                    placeholder={format('customer_type.column.name')}
                    type="text"
                    isInvalid={Boolean(errors.name)}
                  />
                  {errors.name && <ValidationError value={format('validation.error.field_required')} />}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium required-field">{format('customer_master.first_name.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('first_name', { required: true })}
                    name="first_name"
                    id="floatingInput"
                    placeholder={format('customer_master.first_name.label')}
                    type="text"
                    isInvalid={Boolean(errors.first_name)}
                  />
                  {errors.first_name && <ValidationError value={format('validation.error.field_required')} />}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium required-field">{format('customer_master.last_name.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('last_name', { required: true })}
                    name="last_name"
                    id="floatingInput"
                    placeholder={format('customer_master.last_name.label')}
                    type="text"
                    isInvalid={Boolean(errors.last_name)}
                  />
                  {errors.last_name && <ValidationError value={format('validation.error.field_required')} />}
                </div>
              </div>
              <div className="pt-4">
                <p className="text-lg">{format('app.details.label')}</p>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('customer_master.phone.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('phone')}
                    name="phone"
                    id="floatingInput"
                    placeholder={format('customer_master.phone.label')}
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium ">{format('customer_master.address_1.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('address_1')}
                    name="address_1"
                    id="floatingInput"
                    placeholder={format('customer_master.address_1.label')}
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('customer_master.address_2.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('address_2')}
                    name="address_2"
                    id="floatingInput"
                    placeholder={format('customer_master.address_2.label')}
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('customer_master.address_3.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('address_3')}
                    name="address_3"
                    id="floatingInput"
                    placeholder={format('customer_master.address_3.label')}
                    type="text"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('customer_master.city.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('city')}
                    name="city"
                    id="floatingInput"
                    placeholder={format('customer_master.city.label')}
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium ">{format('customer_master.state.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('state')}
                    name="state"
                    id="floatingInput"
                    placeholder={format('customer_master.state.label')}
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('customer_master.country.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('country')}
                    name="country"
                    id="floatingInput"
                    placeholder={format('customer_master.country.label')}
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('customer_master.email.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('email')}
                    name="email"
                    id="floatingInput"
                    placeholder={format('customer_master.email.label')}
                    type="text"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('customer_master.gps.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('latitude_longitude')}
                    name="latitude_longitude"
                    id="floatingInput"
                    placeholder={format('customer_master.gps.label')}
                    type="text"
                  />
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

export default CustomerMasterForm;
