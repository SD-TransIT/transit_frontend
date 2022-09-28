import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { RiDeleteBin7Line } from 'react-icons/ri';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import BatchNumberPicker from 'components/pickers/BatchNumberPicker';
import ItemPickerOutsideForm from 'components/pickers/ItemPickerOutsideForm';
import EditableTable from 'components/shared/table/EditableTable';
import { IOrderLineDetailsType } from 'models/orderLineDetails/IOrderLinedetailsType';
import Input from 'shared/inputs/input';
import { RootState } from 'stores/reducers/rootReducer';
import { orderLineDetailsUrl } from 'stores/sagas/orderLineDetailsSaga';
import refreshAccessToken from 'stores/sagas/utils';
import { getRequest } from 'utils/apiClient';
import { DEFAULT_OFFSET, EMPTY_SEARCHER, FIRST_PAGE } from 'utils/consts';

type Props = {
  initialFormValue: any
  mode: 'Edit' | 'Add' | ''
  orderDetailsId: string | null
};

function OrderLineDetails(
  {
    initialFormValue, mode, orderDetailsId,
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

  const [lineItems, setLineItems] = useState<IOrderLineDetailsType[]>([]);
  const [itemNameY, setItemNameY] = useState();

  const columnHeaders = [
    { label: format('item_details.name.label') },
    { label: format('item_details.batch_namber.label') },
    { label: format('order_details.total_quantity.label') },
  ];

  const {
    orderLineDetails,
  } = useSelector(
    (state: RootState) => state.customerWeekDays,
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
  }, [orderLineDetails, orderDetailsId]);

  useEffect(() => {
    if (data !== undefined) {
      const currentLineItems = data.filter(
        (lineDetail: any) => lineDetail.product === Number(orderDetailsId),
      );
      setLineItems(currentLineItems);
    }
  }, [orderDetailsId, data]);

  const addNewItem = () => {
    if (orderDetailsId) {
      setLineItems([...lineItems, {
        id: Math.floor(Math.random() * 10000),
        order_details: '',
        product: null,
        item_details: undefined,
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
        item_details: undefined,
        quantity: '',
        old_quantity: '',
        product_name: '',
        batch_number: '',
      }]);
    }
  };

  const handleUpdateQuantity = (quantity: any, lineItem: IOrderLineDetailsType) => {
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

  const handleItemNameXX = (itemNameXX: any, lineItem: IOrderLineDetailsType) => {
    if (itemNameXX !== null && lineItem !== null && lineItem !== undefined) {
      setLineItems([
        ...lineItems.map((item) => (item.id === lineItem.id
          ? {
            id: lineItem.id,
            order_details: lineItem.order_details,
            product: itemNameXX.id,
            item_details: lineItem.item_details,
            quantity: lineItem.quantity,
            old_quantity: lineItem.old_quantity,
            product_name: itemNameXX.name,
            batch_number: lineItem.batch_number,
          } : item)),
      ]);
      setItemNameY(itemNameXX);
    }
  };

  const handleBatchNumberXX = (batchNumberXX: any, lineItem: IOrderLineDetailsType) => {
    if (batchNumberXX !== null && lineItem !== null && lineItem !== undefined) {
      setLineItems([
        ...lineItems.map((item) => (item.id === lineItem.id
          ? {
            id: lineItem.id,
            order_details: lineItem.order_details,
            product: lineItem.product,
            item_details: batchNumberXX.item,
            quantity: lineItem.quantity,
            old_quantity: lineItem.old_quantity,
            product_name: lineItem.product_name,
            batch_number: batchNumberXX.batch_number,
          } : item)),
      ]);
    }
  };

  return (
    <EditableTable
      buttonTitle={format('app.add_item')}
      onAddButtonClick={addNewItem}
      columnHeaders={columnHeaders}
    >
      {lineItems?.map((lineItem: any, index: any) => (
        <div className="flex h-12 px-8 items-center even:bg-transit-grey-light" key={lineItem.id}>
          <div className="w-1/3 pr-2">
            <ItemPickerOutsideForm
              field={mode === 'Add' ? null : { id: lineItem.product, name: lineItem.product_name, lineItemId: lineItem }}
              isInvalid={false}
              onChangeItemName={handleItemNameXX}
            />
          </div>
          <div className="w-1/3 pr-2">
            <BatchNumberPicker
              field={mode === 'Add' ? null : {
                id: lineItem.item_details,
                batch_number: lineItem.batch_number,
                lineItemId: lineItem,
              }}
              isInvalid={false}
              isOrderDetails
              watch={itemNameY}
              mode={mode}
              initialFormValue={initialFormValue}
              onChangeBatchNumber={handleBatchNumberXX}
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
            <RiDeleteBin7Line className="table-action-icons" onClick={() => remove(index)} />
          </div>
        </div>
      ))}

    </EditableTable>
  );
}

export default OrderLineDetails;
