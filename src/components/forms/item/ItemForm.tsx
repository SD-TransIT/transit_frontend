import React from 'react';

import classNames from 'classnames';
import { Controller, useForm } from 'react-hook-form';
import { IconContext } from 'react-icons';
import { RiCloseFill } from 'react-icons/ri';
import Select, { GroupBase } from 'react-select';

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

  return (
    <>
      <div className="bg-transit-white w-full rounded-lg pt-4">
        {mode === 'Delete' ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row justify-between">
                <p className="float-left text-[21px] text-transit-black font-semibold">{title}</p>
                <IconContext.Provider
                // eslint-disable-next-line
                value={{ className: 'float-right h-8 w-12 justify-end' }}
                >
                  <RiCloseFill onClick={onCancel} />
                </IconContext.Provider>
              </div>
              <div className="flex flex-col gap-2">
                <p className="float text-left text-[15px] text-transit-black font-medium">Are you sure you want to delete this item?</p>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row justify-between">
                <p className="float-left text-[21px] text-transit-black font-semibold">{title}</p>
                <IconContext.Provider
                  // eslint-disable-next-line
                  value={{ className: 'float-right h-8 w-12 justify-end' }}
                >
                  <RiCloseFill onClick={onCancel} />
                </IconContext.Provider>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium required-field">Item Name</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('name', { required: true })}
                    name="name"
                    id="floatingInput"
                    placeholder="Supplier Name"
                    type="text"
                    className="h-9 placeholder-grey-300"
                    isInvalid={Boolean(errors.name)}
                  />
                  {errors.name && <ValidationError value="This field is required" />}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium">Volume (Cubic Meters)</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('volume', {
                      validate: (value:any) => value === null || value === '' || value >= 0,
                    })}
                    name="volume"
                    id="floatingInput"
                    placeholder="Volume"
                    type="text"
                    className="h-9 placeholder-grey-300"
                    isInvalid={Boolean(errors.volume)}
                  />
                  {errors.volume && errors.volume.type === 'validate' && <ValidationError value="Please enter a number" />}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium">Cost (Local Currency)</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register(('cost'), {
                      validate: (value:any) => value === null || value === '' || value >= 0,
                    })}
                    name="cost"
                    id="floatingInput"
                    placeholder="Cost"
                    type="text"
                    className="h-9 placeholder-grey-300"
                    isInvalid={Boolean(errors.cost)}
                  />
                  {errors.cost && errors.cost.type === 'validate' && <ValidationError value="Please enter a number" />}
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium">Weight (Kgs)</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register(('weight'), {
                      validate: (value:any) => value === null || value === '' || value >= 0,
                    })}
                    name="weight"
                    id="floatingInput"
                    placeholder="Weight"
                    type="text"
                    className="h-9 placeholder-grey-300"
                    isInvalid={Boolean(errors.weight)}
                  />
                  {errors.weight && errors.weight.type === 'validate' && <ValidationError value="Please enter a number" />}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium ">Category</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('category')}
                    name="category"
                    id="floatingInput"
                    placeholder="Category"
                    type="text"
                    className="h-9 placeholder-grey-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium">Sub Category</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('sub_category')}
                    name="sub_category"
                    id="floatingInput"
                    placeholder="Sub Category"
                    type="text"
                    className="h-9 placeholder-grey-300"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2" style={{ width: '207px' }}>
                  <p className="text-xs text-transit-black-secondary font-medium required-field">Conditions</p>
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
                        placeholder="Conditions"
                        className={classNames({ 'border border-transit-red rounded': Boolean(errors.conditions) })}
                      />
                    )}
                    name="conditions"
                  />
                  {errors.conditions && <ValidationError value="This field is required" />}
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
      <div className="flex justify-end text-lg font-medium gap-2 pb-4">
        { mode === 'Edit' && <DeleteButton onClick={() => onDelete?.({})} className="absolute left-5 h-fit w-fit" title="Delete" /> }
        <CancelButton onClick={onCancel} className="w-fit" />
        <SubmitButton onClick={handleSubmit(onSubmit)} className="w-fit" title={submitButtonText} />
      </div>
    </>
  );
}

export default ItemForm;
