import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { RiDeleteBin7Line } from 'react-icons/ri';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import BatchNumberPicker from 'components/pickers/BatchNumberPicker';
import ItemPickerOutsideForm from 'components/pickers/ItemPickerOutsideForm';
import EditableTable from 'components/shared/table/EditableTable';
// import { IOrderLineDetailsType } from 'models/orderLineDetails/IOrderLinedetailsType';
import Input from 'shared/inputs/input';
import { RootState } from 'stores/reducers/rootReducer';
import { orderLineDetailsUrl } from 'stores/sagas/orderLineDetailsSaga';
import refreshAccessToken from 'stores/sagas/utils';
import { getRequest } from 'utils/apiClient';
import { DEFAULT_OFFSET, EMPTY_SEARCHER, FIRST_PAGE } from 'utils/consts';

type Props = {
  mode: 'Edit' | 'Add' | ''
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

  const [, setPageCount] = useState(0);
  const [, setNumberOfAvailableData] = useState(0);
  const [, setPage] = useState(FIRST_PAGE);
  const [data, setData] = useState<any>();
  const [, setSearcher] = useState(EMPTY_SEARCHER);

  const isCleanupRef = useRef(false);
  const fetchIdRef = useRef(0);

  const [lineItems, setLineItems] = useState<any[]>([]);
  const [itemName, setItemName] = useState();

  const columnHeaders = [
    { label: format('item_details.name.label') },
    { label: format('item_details.batch_namber.label') },
    { label: format('order_details.total_quantity.label') },
  ];

  const {
    orderLineDetail,
  } = useSelector(
    (state: RootState) => state.orderLineDetails,
  );

  const calculatePagesCount = (pageSize: number, totalCount: number) => (
    totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize)
  );

  const fetchData = useCallback(async (pageNumber: number, pageSize: number, search: string) => {
    /* eslint-disable-next-line no-plusplus */
    const fetchId = ++fetchIdRef.current;

    isCleanupRef.current = false;

    try {
      if (fetchId === fetchIdRef.current) {
        await refreshAccessToken();
        const result = await getRequest(orderLineDetailsUrl, {
          page: pageNumber,
          searcher: search,
        }, true);

        setPage(pageNumber);
        setData(result.results);
        setPageCount(calculatePagesCount(DEFAULT_OFFSET, result.count));
        setNumberOfAvailableData(result.count);
      }
    } catch (error) {
      setData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPage(FIRST_PAGE);
    setSearcher(EMPTY_SEARCHER);
    fetchData(FIRST_PAGE, DEFAULT_OFFSET, EMPTY_SEARCHER);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderLineDetail, orderDetailsId]);

  useEffect(() => {
    if (data !== undefined) {
      const currentLineItems = data.filter(
        (lineDetail: any) => lineDetail.order_details === orderDetailsId,
      );
      setLineItems(currentLineItems);
    }
  }, [orderDetailsId, data]);

  useEffect(() => {
    onLineItemsChange(lineItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineItems]);

  const addNewItem = () => {
    if (orderDetailsId) {
      setLineItems([...lineItems, {
        id: Math.floor(Math.random() * 10000),
        order_details: orderDetailsId,
        product: null,
        item_details: null,
        quantity: '',
        old_quantity: '',
        product_name: null,
        batch_number: '',
      }]);
    } else {
      setLineItems([...lineItems, {
        id: Math.floor(Math.random() * 10000),
        order_details: '',
        product: null,
        item_details: null,
        quantity: '',
        old_quantity: '',
        product_name: null,
        batch_number: '',
      }]);
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

    if (changeBatchNumber[0]) {
      if (newItemName !== null && lineItem !== null && lineItem !== undefined) {
        setLineItems([
          ...lineItems.map((item) => (item.id === lineItem.id
            ? {
              id: lineItem.id,
              order_details: lineItem.order_details,
              product: newItemName.id,
              item_details: lineItem.item_details,
              quantity: lineItem.quantity,
              old_quantity: lineItem.old_quantity,
              product_name: newItemName.name,
              batch_number: lineItem.batch_number,
            } : item)),
        ]);
        setItemName(newItemName);
      }
    } else if (newItemName !== null && lineItem !== null && lineItem !== undefined) {
      setLineItems([
        ...lineItems.map((item) => (item.id === lineItem.id
          ? {
            id: lineItem.id,
            order_details: lineItem.order_details,
            product: newItemName.id,
            item_details: lineItem.item_details,
            quantity: lineItem.quantity,
            old_quantity: lineItem.old_quantity,
            product_name: newItemName.name,
            batch_number: '',
          } : item)),
      ]);
      setItemName(newItemName);
    } else if (newItemName === null) {
      return;
    }

    setItemName(newItemName);
  };

  const handleNewItemBatchNumber = (newItemBatchNumber: any, lineItem: any) => {
    if (newItemBatchNumber !== null && lineItem !== null && lineItem !== undefined) {
      setLineItems([
        ...lineItems.map((item) => (item.id === lineItem.id
          ? {
            id: lineItem.id,
            order_details: lineItem.order_details,
            product: lineItem.product,
            item_details: newItemBatchNumber.id,
            quantity: lineItem.quantity,
            old_quantity: lineItem.old_quantity,
            product_name: lineItem.product_name,
            batch_number: newItemBatchNumber.batch_number,
          } : item)),
      ]);
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
        <div className="flex h-12 px-8 items-center even:bg-transit-grey-light" key={lineItem.id}>
          <div className="w-1/3 pr-2">
            <ItemPickerOutsideForm
              field={mode === 'Add' ? { id: Math.floor(Math.random() * 10000), name: null, lineItem } : { id: lineItem.product, name: lineItem.product_name, lineItem }}
              isInvalid={false}
              onChangeItemName={handleNewItemName}
            />
          </div>
          <div className="w-1/3 pr-2">
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
              isInvalid={false}
              watch={itemName}
              onChangeBatchNumber={handleNewItemBatchNumber}
            />
          </div>
          <div className="w-1/3 pr-2">
            <Input
              type="number"
              className="w-full"
              isInvalid={false}
              placeholder={format('order_details.total_quantity.label')}
              defaultValue={mode === 'Add' ? null : lineItem.quantity}
              onChange={(event: any) => {
                handleUpdateQuantity(event.target.value, lineItem);
              }}
            />
          </div>
          <div>
            {/* @ts-ignore */}
            <RiDeleteBin7Line className="table-action-icons" onClick={() => removeLineItem(lineItem.id)} />
          </div>
        </div>
      ))}
    </EditableTable>
  );
}

export default OrderLineDetails;
