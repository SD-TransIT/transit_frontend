import React, { useCallback } from 'react';

import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import ConfirmDeleteMessage from 'components/shared/ConfirmDeleteMessage';
import FormHeader from 'components/shared/FormHeader';

import CancelButton from '../../../shared/buttons/CancelButton';
import DeleteButton from '../../../shared/buttons/DeleteButton';
import SubmitButton from '../../../shared/buttons/SubmitButton';
import Input from '../../../shared/inputs/input';
import ValidationError from '../../shared/ValidationError';

import ModeOfTransportFormType from './types';

function ModeOfTransportForm({
  onSubmit, onCancel, title, submitButtonText, initialFormValue, mode, onDelete,
}: ModeOfTransportFormType) {
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
              <div className="flex flex-col gap-2">
                <p className="text-xs text-transit-black-secondary font-medium required-field">{format('mode_of_transport.class.label')}</p>
                <Input
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('class_mode', { required: true })}
                  name="class_mode"
                  id="floatingInput"
                  placeholder={format('mode_of_transport.class.label')}
                  type="text"
                  className="h-9 placeholder-grey-300"
                  isInvalid={Boolean(errors.class_mode)}
                />
                {errors.class_mode && <ValidationError value={format('validation.error.field_required')} />}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs text-transit-black-secondary font-medium required-field">{format('mode_of_transport.vehicle_type.label')}</p>
                <Input
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('vehicle_type', { required: true })}
                  name="vehicle_type"
                  id="floatingInput"
                  placeholder={format('mode_of_transport.vehicle_type.label')}
                  type="text"
                  className="h-9 border-transit-grey-300 placeholder-grey-300"
                  isInvalid={Boolean(errors.vehicle_type)}
                />
                {errors.vehicle_type && <ValidationError value={format('validation.error.field_required')} />}
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

export default ModeOfTransportForm;
