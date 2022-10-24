import React, { useCallback } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import ItemPicker from 'components/pickers/ItemPicker';
import ConfirmDeleteMessage from 'components/shared/ConfirmDeleteMessage';
import FormHeader from 'components/shared/FormHeader';

import CancelButton from '../../shared/buttons/CancelButton';
import DeleteButton from '../../shared/buttons/DeleteButton';
import SubmitButton from '../../shared/buttons/SubmitButton';
import DatePick from '../../shared/DatePicker';
import Input from '../../shared/inputs/input';
import ValidationError from '../../shared/ValidationError';

import ItemDetailFormType from './types';

function ItemDetailForm({
  onSubmit, onCancel, title, submitButtonText, initialFormValue, mode, onDelete,
}: ItemDetailFormType) {
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
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium required-field">{format('shared.item_name.label')}</p>
                  <Controller
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <ItemPicker
                        field={field}
                        isInvalid={Boolean(errors.item_master)}
                      />
                    )}
                    name="item_master"
                  />
                  {errors.item_master && <ValidationError value={format('validation.error.field_required')} />}
                </div>
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('item_details.manufacturing_date.label')}</p>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <DatePick
                        // @ts-ignore
                        currentDate={value}
                        onChange={onChange}
                      />
                    )}
                    name="manufacturing_date"
                  />
                </div>
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('item_details.received_date.label')}</p>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <DatePick
                        // @ts-ignore
                        currentDate={value}
                        onChange={onChange}
                      />
                    )}
                    name="received_date"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('item_details.expiry_date.label')}</p>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <DatePick
                        // @ts-ignore
                        currentDate={value}
                        onChange={onChange}
                      />
                    )}
                    name="expiry_date"
                  />
                </div>
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium required-field">{format('item_details.batch_namber.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('batch_number', {
                      required: format('validation.error.field_required'),
                      pattern: {
                        value: /\d+/,
                        message: format('validation.error.field_number'),
                      },
                      maxLength: {
                        value: 10,
                        message: format('validation.error.character_length'),
                      },
                    })}
                    name="batch_number"
                    id="floatingInput"
                    placeholder={format('item_details.batch_namber.label')}
                    type="text"
                    isInvalid={Boolean(errors.batch_number)}
                  />
                  {/* @ts-ignore */}
                  {errors.batch_number && <ValidationError value={errors.batch_number.message} />}
                </div>
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('item_details.gtin.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('gtin', {
                      pattern: {
                        value: /\d+/,
                        message: format('validation.error.field_number'),
                      },
                      maxLength: {
                        value: 10,
                        message: format('validation.error.character_length'),
                      },
                    })}
                    name="gtin"
                    id="floatingInput"
                    placeholder={format('item_details.gtin.label')}
                    type="text"
                    isInvalid={Boolean(errors.gtin)}
                  />
                  {/* @ts-ignore */}
                  {errors.gtin && <ValidationError value={errors.gtin.message} />}
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('item_details.funding_sources.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('funding_source')}
                    name="funding_source"
                    id="floatingInput"
                    placeholder={format('item_details.funding_sources.label')}
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('item_details.lot_number.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('lot_number', {
                      pattern: {
                        value: /\d+/,
                        message: format('validation.error.field_number'),
                      },
                      maxLength: {
                        value: 10,
                        message: format('validation.error.character_length'),
                      },
                    })}
                    name="lot_number"
                    id="floatingInput"
                    placeholder={format('item_details.lot_number.label')}
                    type="text"
                    isInvalid={Boolean(errors.lot_number)}
                  />
                  {/* @ts-ignore */}
                  {errors.lot_number && <ValidationError value={errors.lot_number.message} />}
                </div>
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('item_details.serial_number.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('serial_number', {
                      pattern: {
                        value: /\d+/,
                        message: format('validation.error.field_number'),
                      },
                      maxLength: {
                        value: 10,
                        message: format('validation.error.character_length'),
                      },
                    })}
                    name="serial_number"
                    id="floatingInput"
                    placeholder={format('item_details.serial_number.label')}
                    type="text"
                    isInvalid={Boolean(errors.serial_number)}
                  />
                  {/* @ts-ignore */}
                  {errors.serial_number && <ValidationError value={errors.serial_number.message} />}
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

export default ItemDetailForm;
