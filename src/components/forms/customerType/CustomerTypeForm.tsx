import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { RiCloseFill } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import Input from '../../../shared/inputs/input';
import ValidationError from '../../shared/ValidationError';
import SubmitButton from '../../../shared/buttons/SubmitButton';
import CancelButton from '../../../shared/buttons/CancelButton';

interface CustomerTypeFormProps {
  onSubmit: (formValues: FieldValues) => void;
  onCancel: () => void;
  title: string;
  initialFormValue: FieldValues;
}

function CustomerTypeForm({
  onSubmit, onCancel, title, initialFormValue,
}: CustomerTypeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialFormValue });

  return (
    <>
      <div className="bg-transit-white w-full rounded-lg py-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="gap-3 py-4">
              <p className="float-left text-2xl">{title}</p>
              <IconContext.Provider
                // eslint-disable-next-line
                value={{ className: 'float-right h-8 w-12 justify-end' }}
              >
                <RiCloseFill onClick={onCancel} />
              </IconContext.Provider>
            </div>
            <div className="h-12">
              <Input
              // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('customerTypeName', { required: true })}
                name="customerTypeName"
                id="floatingInput"
                placeholder="Customer Type"
                type="text"
              />
              <div className="pb-2">
                {errors.customerTypeName && <ValidationError value="This field is required" />}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="flex justify-end text-lg font-medium py-2 gap-2">
        <CancelButton onClick={onCancel} className="w-fit" />
        <SubmitButton onClick={handleSubmit(onSubmit)} className="w-fit" title={title.includes('New') ? 'Add' : 'Edit'} />
      </div>
    </>
  );
}

export default CustomerTypeForm;
