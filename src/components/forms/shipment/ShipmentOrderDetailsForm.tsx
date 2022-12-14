import React, { useCallback, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { ManualFormProps } from 'components/forms/types';
import CustomerPicker from 'components/pickers/CustomerPicker';
import OrderPicker from 'components/pickers/OrderPicker';
import CancelButton from 'components/shared/buttons/CancelButton';
import SubmitButton from 'components/shared/buttons/SubmitButton';
import FormHeader from 'components/shared/FormHeader';
import TableWithoutPagination from 'components/shared/table/TableWithoutPagination';
import { ColumnType } from 'components/shared/table/types';
import ValidationError from 'components/shared/ValidationError';

function ShipmentOrderDetailsForm({
  onSubmit, onCancel, title, initialFormValue, submitButtonText, mode, currentData,
}: ManualFormProps) {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: initialFormValue });

  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const columns: ColumnType[] = React.useMemo(() => [
    {
      Header: 'ID',
      accessor: 'id',
      width: 60,
      maxWidth: 60,
    },
    {
      Header: format('shared.product_name.label'),
      accessor: 'product_name',
      width: 400,
      maxWidth: 400,
    },
    {
      Header: format('shipment.order_line_items.quantity.label'),
      accessor: 'quantity',
      width: 75,
      maxWidth: 75,
    },
  ], [format]);

  const orderDetailData = mode === 'Show' ? initialFormValue as object [] : [];
  const [orderData] = useState(orderDetailData);

  const isCustomerPickerDisabled = () => {
    const customerInitValue = initialFormValue?.customer ?? null;
    return customerInitValue !== null;
  };

  return (
    // eslint-disable-next-line
    <>
      { mode === 'Show' ? (
        <div className="bg-transit-white w-full rounded-lg pt-4">
          <FormHeader title={title} onClick={onCancel} />
          <TableWithoutPagination
            columns={columns}
            data={orderData}
          >
            <div />
          </TableWithoutPagination>
        </div>
      ) : (
        <>
          <div className="bg-transit-white w-full rounded-lg pt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <FormHeader title={title} onClick={onCancel} />
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium required-field">{format('shared.customer_name.name')}</p>
                  <Controller
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <CustomerPicker
                        field={field}
                        isInvalid={Boolean(errors.customer)}
                        isDisabled={isCustomerPickerDisabled()}
                      />
                    )}
                    name="customer"
                  />
                  {errors.customer && <ValidationError value={format('validation.error.field_required')} />}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-transit-black-secondary font-medium required-field">{format('shared.order_number.label')}</p>
                  <Controller
                    rules={{
                      required: true,
                      validate: (value:any) => (
                        currentData.includes(value.order_details_id) === false
                      ),
                    }}
                    control={control}
                    render={({ field }) => (
                      <OrderPicker
                        field={field}
                        isInvalid={Boolean(errors.order_details)}
                        isShipment
                        watch={watch('customer')}
                        setValue={setValue}
                      />
                    )}
                    name="order_details"
                  />
                  {errors.order_details && errors.order_details.type === 'required' && <ValidationError value={format('validation.error.field_required')} />}
                  {errors.order_details && errors.order_details.type === 'validate' && <ValidationError value={format('validation.error.duplicate_order')} />}
                </div>
              </div>
            </form>
          </div>
          <div className="flex justify-end text-lg font-medium gap-2 pb-4">
            <CancelButton onClick={onCancel} className="w-fit" />
            <SubmitButton onClick={handleSubmit(onSubmit)} className="w-fit" title={submitButtonText} />
          </div>
        </>
      )}
    </>
  );
}

export default ShipmentOrderDetailsForm;
