import React, { useCallback, useState } from 'react';

import { FieldValues } from 'react-hook-form';
import { useIntl } from 'react-intl';

import TableWithoutPagination from 'components/shared/table/TableWithoutPagination';
import { ColumnType } from 'components/shared/table/types';
import SubmitButton from 'shared/buttons/SubmitButton';
import Dialog from 'shared/dialog/Dialog';

import ShipmentOrderDetailsForm from './ShipmentOrderDetailsForm';

function ShipmentOrderData({
  onOrderDetailAdd, onOrderDetailDelete, orderDetails,
}: any) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const [displayAddModal, setDisplayAddModal] = useState(false);
  const [displayShowOrderModal, setDisplayShowOrderModal] = useState(false);
  const [orderDetailList, setOrderDetailList] = useState(orderDetails);
  const [orderLineItemToShow, setOrderLineItemToShow] = useState([]);

  const toggleAddModal = () => {
    setDisplayAddModal(!displayAddModal);
  };

  const toggleShowOrderModal = (object?: FieldValues) => {
    if (object) {
      const lineItems = orderDetails.filter(
        (order: any) => order.order_details_id === object.order_details_id,
      ).map((order: any) => order.line_items);
      setOrderLineItemToShow(lineItems);
    }
    setDisplayShowOrderModal(!displayShowOrderModal);
  };

  const onSubmitAdd = (formValues: FieldValues) => {
    onOrderDetailAdd(formValues);
    setOrderDetailList(orderDetails);
    toggleAddModal();
  };

  const onDelete = (object: FieldValues) => {
    onOrderDetailDelete(object);
    const arrayDeleted = orderDetails.filter(
      (order: any) => order.order_details_id !== object.order_details_id,
    );
    setOrderDetailList(arrayDeleted);
  };

  const columns: ColumnType[] = React.useMemo(() => [
    {
      Header: format('shipment.customer_name.label'),
      accessor: 'customer_name',
    },
    {
      Header: format('shipment.order_number.label'),
      accessor: 'order_details_id',
    },
  ], [format]);

  return (
    <>
      <div className="flow-root">
        <p className="float-left text-[21px] text-transit-black font-semibold">{format('shipment.orders.label')}</p>
        <SubmitButton onClick={toggleAddModal} className="float-right h-fit w-fit" title={format('shipment.order_add.label')} />
      </div>
      <div>
        <TableWithoutPagination
          columns={columns}
          data={orderDetailList.map((row: any) => (
            { customer_name: row.customer_name, order_details_id: row.order_details_id }
          ))}
          deleteAction={onDelete}
          editAction={toggleShowOrderModal}
        >
          <div />
        </TableWithoutPagination>
      </div>
      <Dialog
        isOpen={displayAddModal}
        onClose={toggleAddModal}
        setCustomDialogContent
        // eslint-disable-next-line
        children={[
          <ShipmentOrderDetailsForm
            onSubmit={onSubmitAdd}
            onCancel={toggleAddModal}
            title={`${format('shipment.add_order_to_shipment.label')}`}
            initialFormValue={{}}
            mode="Add"
            submitButtonText={format('app.add')}
            currentData={orderDetailList.map((row: any) => (row.order_details_id))}
          />,
        ]}
      />
      <Dialog
        isOpen={displayShowOrderModal}
        onClose={toggleShowOrderModal}
        setCustomDialogContent
        // eslint-disable-next-line
        children={[
          <ShipmentOrderDetailsForm
            onSubmit={() => {}}
            onCancel={toggleShowOrderModal}
            title={`${format('order_details')}`}
            initialFormValue={orderLineItemToShow[0]}
            mode="Show"
            submitButtonText={format('app.add')}
          />,
        ]}
      />
    </>
  );
}

export default ShipmentOrderData;
