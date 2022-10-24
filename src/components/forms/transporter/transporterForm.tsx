import React, { useCallback } from 'react';

import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import CancelButton from 'components/shared/buttons/CancelButton';
import DeleteButton from 'components/shared/buttons/DeleteButton';
import SubmitButton from 'components/shared/buttons/SubmitButton';
import ConfirmDeleteMessage from 'components/shared/ConfirmDeleteMessage';
import FormHeader from 'components/shared/FormHeader';
import Input from 'components/shared/inputs/input';
import ValidationError from 'components/shared/ValidationError';

import { ManualFormProps } from '../types';

function TransporterForm({
  onSubmit, onCancel, title, submitButtonText, initialFormValue, mode, onDelete,
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
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium required-field">{format('transporter.transporter_name.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('name', { required: true })}
                    name="name"
                    id="floatingInput"
                    placeholder={format('transporter.transporter_name.label')}
                    type="text"
                    isInvalid={Boolean(errors.name)}
                  />
                  {errors.name && <ValidationError value={format('validation.error.field_required')} />}
                </div>
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('transporter.address_1.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('address_1')}
                    name="address_1"
                    id="floatingInput"
                    placeholder={format('transporter.address_1.label')}
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('transporter.address_2.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('address_2')}
                    name="address_2"
                    id="floatingInput"
                    placeholder={format('transporter.address_2.label')}
                    type="text"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('transporter.address_3.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('address_3')}
                    name="address_3"
                    id="floatingInput"
                    placeholder={format('transporter.address_3.label')}
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium ">{format('transporter.city.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('city')}
                    name="city"
                    id="floatingInput"
                    placeholder={format('transporter.city.label')}
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('transporter.state.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('state')}
                    name="state"
                    id="floatingInput"
                    placeholder={format('transporter.state.label')}
                    type="text"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('transporter.country.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('country')}
                    name="country"
                    id="floatingInput"
                    placeholder={format('transporter.country.label')}
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('transporter.phone_number.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('phone')}
                    name="phone"
                    id="floatingInput"
                    placeholder={format('transporter.phone_number.label')}
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('transporter.gps.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('latitude_longitude')}
                    name="latitude_longitude"
                    id="floatingInput"
                    placeholder={format('transporter.gps.label')}
                    type="text"
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

export default TransporterForm;
