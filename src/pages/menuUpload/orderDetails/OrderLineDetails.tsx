import React, {
  useCallback,
} from 'react';

import {
  Controller, useFieldArray, useForm,
} from 'react-hook-form';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import BatchNumberPicker from 'components/pickers/BatchNumberPicker';
import ItemPicker from 'components/pickers/ItemPicker';
import EditableTable from 'components/shared/table/EditableTable';
import ValidationError from 'components/shared/ValidationError';
import Input from 'shared/inputs/input';

type Props = {
  initialFormValue: any
  lineItemsData: any
  mode: 'Edit' | 'Add' | ''
};

function OrderLineDetails(
  {
    initialFormValue, lineItemsData, mode,
  }: Props,
) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const columnHeaders = [
    { label: format('item_details.name.label') },
    { label: format('item_details.batch_namber.label') },
    { label: format('order_details.total_quantity.label') },
  ];

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },

  } = useForm({ defaultValues: { lineItems: lineItemsData }, mode: 'onBlur' });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'lineItems',
  });

  const onSubmit = (data: any) => console.log(data);

  const watchFieldArray = watch('lineItems');

  const controlledFields = fields.map((field, index) => (
    {
      ...field,
      ...watchFieldArray[index],
    }));

  return (
    <EditableTable
      buttonTitle={format('app.add_item')}
      onAddButtonClick={() => append({
        id: '',
        batch_number: '',
        order_details: '',
        product: '',
        item_details: '',
        quantity: '',
        old_quantity: '',
        product_name: '',
      })}
      columnHeaders={columnHeaders}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {controlledFields.map((field, index) => (
          <div className="flex h-12 px-8 items-center even:bg-transit-grey-light" key={field.id}>
            <div className="w-1/3 pr-2">
              <Controller
                rules={{ required: true }}
                control={control}
                render={() => (
                  <ItemPicker
                    field={field}
                    // @ts-ignore
                    isInvalid={Boolean(errors?.lineItems?.[index]?.product)}
                  />
                )}
                name={`lineItems.${index}.product`}
              />
              {/* @ts-ignore */}
              {errors?.lineItems?.[index].product && <ValidationError value={format('validation.error.field_required')} />}
            </div>
            <div className="w-1/3 pr-2">
              <Controller
                rules={{ required: true }}
                control={control}
                render={() => (
                  <BatchNumberPicker
                    field={field}
                    // @ts-ignore
                    isInvalid={Boolean(errors.batch_number)}
                    isOrderDetails
                    watch={watch(`lineItems.${index}.item_master`)}
                    // @ts-ignore
                    setValue={setValue}
                    mode={mode}
                    initialFormValue={initialFormValue}
                  />
                )}
                name={`lineItems.${index}.batch_number`}
              />
              {/* @ts-ignore */}
              {errors?.lineItems?.[index].batch_number && <ValidationError value={format('validation.error.field_required')} />}
            </div>
            <div className="w-1/3 pr-2">
              <Input
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register(`lineItems.${index}.quantity`, {
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
                type="number"
                className="w-full"
                // @ts-ignore
                isInvalid={Boolean(errors?.lineItems?.[index].quantity)}
              />
              {/* @ts-ignore */}
              {errors?.lineItems?.[index].quantity
              // @ts-ignore
                && <ValidationError value={errors?.lineItems?.[index].quantity.message} />}
            </div>
            <div>
              {/* @ts-ignore */}
              <RiDeleteBin7Line className="table-action-icons" onClick={() => remove(index)} />
            </div>
          </div>
        ))}
      </form>
    </EditableTable>
  );
}

export default OrderLineDetails;
