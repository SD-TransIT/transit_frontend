import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { RiDeleteBin7Line } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import BatchNumberPicker from 'components/pickers/BatchNumberPicker';
import ItemPickerOutsideForm from 'components/pickers/ItemPickerOutsideForm';
import EditableTable from 'components/shared/table/EditableTable';
import Input from 'shared/inputs/input';
import { orderLineDetailsUrl } from 'stores/sagas/orderLineDetailsSaga';
import refreshAccessToken from 'stores/sagas/utils';
import { getRequest } from 'utils/apiClient';

type Props = {
  mode: 'Edit' | 'Add'
  orderDetailsId: string | null
  onLineItemsChange: (lineItems: any) => void
};

function OrderLineDetails(
  {
    mode, orderDetailsId, onLineItemsChange,
  }: Props,
) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const [data, setData] = useState<any>();

  const isCleanupRef = useRef(false);
  const fetchIdRef = useRef(0);

  const [lineItems, setLineItems] = useState<any[]>([]);
  const [itemName, setItemName] = useState();

  const columnHeaders = [
    { label: format('shared.item_name.label') },
    { label: format('item_details.batch_namber.label') },
    { label: format('order_details.total_quantity.label') },
  ];

  const fetchData = useCallback(async () => {
    /* eslint-disable-next-line no-plusplus */
    const fetchId = ++fetchIdRef.current;

    isCleanupRef.current = false;

    try {
      if (fetchId === fetchIdRef.current) {
        await refreshAccessToken();
        const result = await getRequest(orderLineDetailsUrl, {
          searcher: orderDetailsId,
        }, false);
        setData(result);
      }
    } catch (error) {
      setData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (orderDetailsId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderDetailsId]);

  useEffect(() => {
    if (data !== undefined) {
      setLineItems(data);
    }
  }, [orderDetailsId, data]);

  useEffect(() => {
    onLineItemsChange(lineItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineItems]);

  const addNewItem = () => {
    const variables = {
      id: Math.floor(Math.random() * 10000),
      product: null,
      item_details: null,
      quantity: '',
      old_quantity: '',
      product_name: null,
      batch_number: '',
      order_details: '',
    };

    if (orderDetailsId) {
      variables.order_details = orderDetailsId;
      setLineItems([...lineItems, variables]);
    } else {
      setLineItems([...lineItems, variables]);
    }
  };

  const handleUpdateQuantity = (quantity: any, lineItem: any) => {
    if (quantity !== null && lineItem !== null && lineItem !== undefined) {
      setLineItems([
        ...lineItems.map((item) => (item.id === lineItem.id
          ? {
            id: lineItem.id,
            order_details: lineItem.order_details,
            product: lineItem.product,
            item_details: lineItem.item_details,
            quantity,
            old_quantity: lineItem.old_quantity,
            product_name: lineItem.product_name,
            batch_number: lineItem.batch_number,
          } : item)),
      ]);
    }
  };

  const handleNewItemName = (newItemName: any, lineItem: any) => {
    const currentLineItemDetail: any = lineItems.filter(
      (currentlineItem) => currentlineItem.id === lineItem.id,
    );

    let shouldBatchNumberBeNull: boolean;
    const changeBatchNumber = currentLineItemDetail.map((currentLineItem: any) => {
      if (currentLineItem.product_name === newItemName?.name) {
        shouldBatchNumberBeNull = true;
        return shouldBatchNumberBeNull;
      }
      shouldBatchNumberBeNull = false;
      return shouldBatchNumberBeNull;
    });

    const variables = {
      id: lineItem.id,
      order_details: lineItem.order_details,
      product: newItemName.id,
      item_details: lineItem.item_details,
      quantity: lineItem.quantity,
      old_quantity: lineItem.old_quantity,
      product_name: newItemName.name,
      batch_number: '',
    };

    if (changeBatchNumber[0]) {
      if (newItemName !== null && lineItem !== null && lineItem !== undefined) {
        variables.batch_number = lineItem.batch_number;

        setLineItems([...lineItems.map((item) => (item.id === lineItem.id ? variables : item))]);
        setItemName(newItemName);
      }
    } else if (newItemName !== null && lineItem !== null && lineItem !== undefined) {
      setLineItems([...lineItems.map((item) => (item.id === lineItem.id ? variables : item))]);
      setItemName(newItemName);
    }
  };

  const handleNewItemBatchNumber = (newItemBatchNumber: any, lineItem: any) => {
    const variables = {
      id: lineItem.id,
      order_details: lineItem.order_details,
      product: lineItem.product,
      item_details: '',
      quantity: lineItem.quantity,
      old_quantity: lineItem.old_quantity,
      product_name: lineItem.product_name,
      batch_number: '',
    };

    if (newItemBatchNumber !== null && lineItem !== null && lineItem !== undefined) {
      variables.item_details = newItemBatchNumber.id;
      variables.batch_number = newItemBatchNumber.batch_number;

      setLineItems([...lineItems.map((item) => (item.id === lineItem.id ? variables : item))]);
    } else if (newItemBatchNumber === null) {
      setLineItems([...lineItems.map((item) => (item.id === lineItem.id ? variables : item))]);
    }
  };

  const removeLineItem = (lineItemId: number) => {
    setLineItems([
      ...lineItems.filter(({ id }) => id !== lineItemId),
    ]);
  };

  return (
    <EditableTable
      buttonTitle={format('app.add_item')}
      onAddButtonClick={addNewItem}
      columnHeaders={columnHeaders}
    >
      {lineItems?.map((lineItem: any) => (
        <div className="flex pl-4 py-2 items-center even:bg-transit-grey-light" key={lineItem.id}>
          <div className="flex flex-row w-full">
            <div className="w-1/3 pr-4">
              <ItemPickerOutsideForm
                field={mode === 'Add' ? {
                  id: Math.floor(Math.random() * 10000),
                  name: null,
                  lineItem,
                } : {
                  id: lineItem.product,
                  name: lineItem.product_name,
                  lineItem,
                }}
                onChangeItemName={handleNewItemName}
              />
            </div>
            <div className="w-1/3 pr-4">
              <BatchNumberPicker
                field={mode === 'Add' ? {
                  id: lineItem.id,
                  batch_number: lineItem.batch_number,
                  lineItem,
                } : {
                  id: lineItem.item_details,
                  batch_number: lineItem.batch_number,
                  lineItem,
                }}
                watch={itemName}
                onChangeBatchNumber={handleNewItemBatchNumber}
              />
            </div>
            <div className="w-1/3 pr-4">
              <Input
                type="number"
                className="w-full"
                isInvalid={lineItem.quantity.trim().length < 1}
                placeholder={format('order_details.total_quantity.label')}
                defaultValue={mode === 'Add' ? null : lineItem.quantity}
                onChange={(event: any) => {
                  handleUpdateQuantity(event.target.value, lineItem);
                }}
              />
            </div>
          </div>
          <div className="w-fit pr-4">
            <RiDeleteBin7Line className="table-action-icons" onClick={() => removeLineItem(lineItem.id)} />
          </div>
        </div>
      ))}
    </EditableTable>
  );
}

export default OrderLineDetails;
