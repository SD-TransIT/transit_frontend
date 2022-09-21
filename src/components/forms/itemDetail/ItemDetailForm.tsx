import React, { useCallback } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import ItemDetailPicker from 'components/pickers/ItemDetailPicker';
import ConfirmDeleteMessage from 'components/shared/ConfirmDeleteMessage';
import FormHeader from 'components/shared/FormHeader';

import CancelButton from '../../../shared/buttons/CancelButton';
import DeleteButton from '../../../shared/buttons/DeleteButton';
import SubmitButton from '../../../shared/buttons/SubmitButton';
import Input from '../../../shared/inputs/input';
import DatePick from '../../shared/DatePicker';
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
                <div className="flex flex-col gap-2 w-1/4">
                  <p className="text-xs text-transit-black-secondary font-medium required-field">{format('item_details.name.label')}</p>
                  <Controller
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <ItemDetailPicker
                        field={field}
                        isInvalid={Boolean(errors.item_name)}
                      />
                    )}
                    name="item_name"
                  />
                  {errors.item_name && <ValidationError value="This field is required" />}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('item_details.manufacturing_date.label')}</p>
                  <DatePick
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('manufacturing_date')}
                    currentDate={new Date()}
                    onChange={() => { }}
                    name="manufacturing_date"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium required-field">{format('item_details.received_date.label')}</p>
                  <DatePick
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('received_date')}
                    currentDate={new Date()}
                    onChange={() => { }}
                    name="received_date"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium required-field">{format('item_details.expiry_date.label')}</p>
                  <DatePick
                                          // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('expiry_date')}
                    currentDate={new Date()}
                    onChange={() => { }}
                    name="expiry_date"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium ">{format('item_details.batch_namber.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('batch_number')}
                    name="batch_number"
                    id="floatingInput"
                    placeholder={format('item_details.batch_namber.label')}
                    type="text"
                    className="h-9 placeholder-grey-300"
                  />
                  {errors.batch_number && <ValidationError value="This field is required" />}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('item_details.gtin.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('gtin')}
                    name="gtin"
                    id="floatingInput"
                    placeholder={format('item_details.gtin.label')}
                    type="text"
                    className="h-9 placeholder-grey-300"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('item_details.funding_sources.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('funding_source')}
                    name="funding_source"
                    id="floatingInput"
                    placeholder={format('item_details.funding_sources.label')}
                    type="text"
                    className="h-9 placeholder-grey-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('item_details.lot_number.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('lot_number')}
                    name="lot_number"
                    id="floatingInput"
                    placeholder={format('item_details.lot_number.label')}
                    type="text"
                    className="h-9 placeholder-grey-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('item_details.serial_number.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('serial_number')}
                    name="serial_number"
                    id="floatingInput"
                    placeholder={format('item_details.serial_number.label')}
                    type="text"
                    className="h-9 placeholder-grey-300"
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

export default ItemDetailForm;
