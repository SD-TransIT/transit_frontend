import React, { useCallback, useEffect, useState } from 'react';

import _ from 'lodash';
import { useIntl } from 'react-intl';

import Input from 'components/shared/inputs/input';
import EditableTable from 'components/shared/table/EditableTable';
import { IOrderDetails } from 'models/orderDetails/IOrderDetails';
import { getOrdersByOrdersIdRequest } from 'stores/sagas/orderDetailsSaga';
import { getPodDetailsByOrdersIdRequest } from 'stores/sagas/podVarianceSaga';
import refreshAccessToken from 'stores/sagas/utils';

function PodVarianceDetailsForm({
  shipment, setValue, mode, initialFormValue,
}: any) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const [orderLines, setOrdersLines] = useState<any[]>([]);

  const getOrdersByShipmentOrders = async () => {
    if (shipment && shipment.order_ids.length > 0) {
      try {
        await refreshAccessToken();
        const response = await getOrdersByOrdersIdRequest(shipment.order_ids.toString());
        const orderLineDetails = response.map(
          (orderDetails: IOrderDetails) => orderDetails.line_items,
        );
        const orderLineDetailsFlatted = orderLineDetails.flat();
        setOrdersLines(orderLineDetailsFlatted.map((orderLine: any) => ({
          ...orderLine,
          old_quantity: _.cloneDeep(orderLine.quantity),
        })));
      } catch (error) {
        setOrdersLines([]);
      }
    } else {
      setOrdersLines([]);
    }
  };

  const getPodDetailsByShipmentOrders = async () => {
    try {
      await refreshAccessToken();
      const response = await getPodDetailsByOrdersIdRequest(initialFormValue.id);
      setOrdersLines(response);
    } catch (error) {
      setOrdersLines([]);
    }
  };

  const getDataForTable = async () => {
    if (mode === 'Add') {
      getOrdersByShipmentOrders();
    } else {
      getPodDetailsByShipmentOrders();
    }
  };

  useEffect(() => {
    setValue('pod_variance_details', null);
    getDataForTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shipment]);

  useEffect(() => {
    setValue('pod_variance_details', orderLines);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderLines]);

  const handleUpdateNewQuantity = (quantity: any, orderLineToUpdate: any) => {
    setOrdersLines([
      ...orderLines.map((orderLine: any) => (orderLineToUpdate.id === orderLine.id
        ? {
          id: orderLineToUpdate.id,
          order_line_details: orderLineToUpdate?.order_line_details ?? null,
          product_name: orderLineToUpdate.product_name,
          old_quantity: orderLineToUpdate.old_quantity,
          quantity,
        } : orderLine))]);
  };

  const columnHeaders = [
    { label: format('shared.order_number.label') },
    { label: format('shared.product_name.label') },
    { label: format('shared.total_quantity.label') },
    { label: format('pod_variance.order.quantity.new.label') },
  ];

  return (
    <div className="flex flex-row">
      <EditableTable
        tableTitle={format('pod_variance.variance_details.label')}
        onAddButtonClick={() => {}}
        columnHeaders={columnHeaders}
      >
        {orderLines.map((orderLine: any) => (
          <div className="flex pl-4 py-2 items-center even:bg-transit-grey-light" key={orderLine.id}>
            <div className="flex flex-row w-full">
              <div className="w-1/4 pr-3">
                <p>{mode === 'Add' ? orderLine.id : orderLine.order_line_details}</p>
              </div>
              <div className="w-1/4 pr-4">
                <p>{orderLine.product_name}</p>
              </div>
              <div className="w-1/4 pr-4">
                <p>{orderLine.old_quantity}</p>
              </div>
              <div className="w-1/4 pr-4">
                <Input
                  type="number"
                  className=""
                  isInvalid={false}
                  placeholder={format('pod_variance.order.quantity.new.label')}
                  defaultValue={orderLine.quantity}
                  onChange={(event: any) => {
                    handleUpdateNewQuantity(event.target.value, orderLine);
                  }}
                />
              </div>
            </div>
            <div className="w-10 pr-4" />
          </div>
        ))}
      </EditableTable>
    </div>
  );
}

export default PodVarianceDetailsForm;
