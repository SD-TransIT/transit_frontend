import React from 'react';

import { useForm } from 'react-hook-form';

import SupplierFormType from 'components/forms/supplierMaster/types';
import ConfirmDeleteMessage from 'components/shared/ConfirmDeleteMessage';
import FormHeader from 'components/shared/FormHeader';
import ValidationError from 'components/shared/ValidationError';
import CancelButton from 'shared/buttons/CancelButton';
import DeleteButton from 'shared/buttons/DeleteButton';
import SubmitButton from 'shared/buttons/SubmitButton';
import Input from 'shared/inputs/input';

function SupplierMasterForm({
  onSubmit, onCancel, title, submitButtonText, initialFormValue, mode, onDelete,
}: SupplierFormType) {
  const {
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

              <FormHeader title={title} onClick={onCancel} />
              <ConfirmDeleteMessage />
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormHeader title={title} onClick={onCancel} />
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium required-field">Supplier Name</p>
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
                  <p className="text-xs text-transit-black-secondary font-medium">Address 1</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('address_1')}
                    name="address_1"
                    id="floatingInput"
                    placeholder="Address"
                    type="text"
                    className="h-9 border-transit-grey-300 placeholder-grey-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium">Address 2</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('address_2')}
                    name="address_2"
                    id="floatingInput"
                    placeholder="Address"
                    type="text"
                    className="h-9 border-transit-grey-300 placeholder-grey-300"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium">Address 3</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('address_3')}
                    name="address_3"
                    id="floatingInput"
                    placeholder="Address"
                    type="text"
                    className="h-9 border-transit-grey-300 placeholder-grey-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium ">City</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('city')}
                    name="city"
                    id="floatingInput"
                    placeholder="City"
                    type="text"
                    className="h-9 border-transit-grey-300 placeholder-grey-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium">State</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('state')}
                    name="state"
                    id="floatingInput"
                    placeholder="State"
                    type="text"
                    className="h-9 border-transit-grey-300 placeholder-grey-300"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium">Country</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('country')}
                    name="country"
                    id="floatingInput"
                    placeholder="Country"
                    type="text"
                    className="h-9 border-transit-grey-300 placeholder-grey-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium">Phone Number</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('phone')}
                    name="phone"
                    id="floatingInput"
                    placeholder="Phone Number"
                    type="text"
                    className="h-9 border-transit-grey-300 placeholder-grey-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium">Email</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('email')}
                    name="email"
                    id="floatingInput"
                    placeholder="Email"
                    type="text"
                    className="h-9 border-transit-grey-300 placeholder-grey-300"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium">GPS coordinates</p>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('latitude_longitude')}
                    name="latitude_longitude"
                    id="floatingInput"
                    placeholder="GPS Coordinates"
                    type="text"
                    className="h-9 border-transit-grey-300 placeholder-grey-300"
                  />
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

export default SupplierMasterForm;
