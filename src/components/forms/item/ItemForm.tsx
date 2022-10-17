import React, { useCallback } from 'react';

import classNames from 'classnames';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import Select, { GroupBase } from 'react-select';

import customPickerStyles from 'components/pickers/customPickerStyles';
import ConfirmDeleteMessage from 'components/shared/ConfirmDeleteMessage';
import FormHeader from 'components/shared/FormHeader';

import CancelButton from '../../../shared/buttons/CancelButton';
import DeleteButton from '../../../shared/buttons/DeleteButton';
import SubmitButton from '../../../shared/buttons/SubmitButton';
import Input from '../../../shared/inputs/input';
import ValidationError from '../../shared/ValidationError';

import ItemFormType from './types';

const conditionsOptions = [
  { value: 'ColdChain', label: 'ColdChain' },
  { value: 'Ambient', label: 'Ambient' },
];

function ItemForm({
  onSubmit, onCancel, title, submitButtonText, initialFormValue, mode, onDelete,
}: ItemFormType) {
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
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('name', { required: true })}
                    name="name"
                    id="floatingInput"
                    placeholder={format('shared.item_name.label')}
                    type="text"
                    isInvalid={Boolean(errors.name)}
                  />
                  {errors.name && <ValidationError value={format('validation.error.field_required')} />}
                </div>
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('item_master.volume.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('volume', {
                      validate: (value:any) => value === null || value === '' || value >= 0,
                    })}
                    name="volume"
                    id="floatingInput"
                    placeholder={format('item_master.volume.placeholder')}
                    type="text"
                    isInvalid={Boolean(errors.volume)}
                  />
                  {errors.volume && errors.volume.type === 'validate' && <ValidationError value={format('validation.error.field_number')} />}
                </div>
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('item_master.cost.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register(('cost'), {
                      validate: (value:any) => value === null || value === '' || value >= 0,
                    })}
                    name="cost"
                    id="floatingInput"
                    placeholder={format('item_master.cost.placeholder')}
                    type="text"
                    isInvalid={Boolean(errors.cost)}
                  />
                  {errors.cost && errors.cost.type === 'validate' && <ValidationError value={format('validation.error.field_number')} />}
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('item_master.weight.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register(('weight'), {
                      validate: (value:any) => value === null || value === '' || value >= 0,
                    })}
                    name="weight"
                    id="floatingInput"
                    placeholder={format('item_master.weight.placeholder')}
                    type="text"
                    isInvalid={Boolean(errors.weight)}
                  />
                  {errors.weight && errors.weight.type === 'validate' && <ValidationError value={format('validation.error.field_number')} />}
                </div>
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium ">{format('item_master.category.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('category')}
                    name="category"
                    id="floatingInput"
                    placeholder={format('item_master.category.label')}
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium">{format('item_master.sub_category.label')}</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('sub_category')}
                    name="sub_category"
                    id="floatingInput"
                    placeholder={format('item_master.sub_category.label')}
                    type="text"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2 w-1/3">
                  <p className="text-xs text-transit-black-secondary font-medium required-field">{format('item_master.conditions.label')}</p>
                  <Controller
                    rules={{ required: true }}
                    control={control}
                    render={({
                      field: {
                        onChange, value, name, ref,
                      },
                    }) => (
                      <Select<Object, true, GroupBase<Object>>
                        name={name}
                        ref={ref}
                        value={value}
                        onChange={onChange}
                        options={conditionsOptions}
                        placeholder={format('item_master.conditions.label')}
                        className={classNames({ 'border border-transit-red rounded': Boolean(errors.conditions), 'border border-transit-grey-300 rounded': !errors.conditions })}
                        styles={customPickerStyles}
                      />
                    )}
                    name="conditions"
                  />
                  {errors.conditions && <ValidationError value={format('validation.error.field_required')} />}
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

export default ItemForm;
