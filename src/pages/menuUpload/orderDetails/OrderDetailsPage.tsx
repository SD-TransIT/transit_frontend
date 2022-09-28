import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { format as formatDate } from 'date-fns';
import { FieldValues } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import OrderDetailsForm from 'components/forms/orderDetails/OrderDetailsForm';
import PageBody from 'components/shared/PageBody';
import Searcher from 'components/shared/Searcher';
import Table from 'components/shared/table/Table';
import { ColumnType } from 'components/shared/table/types';
import PageHeader from 'pages/types';
import AddItemButton from 'shared/buttons/AddItemButton';
import Dialog from 'shared/dialog/Dialog';
import { RootState } from 'stores/reducers/rootReducer';
import { orderDetailsUrl } from 'stores/sagas/orderDetailsSaga';
import refreshAccessToken from 'stores/sagas/utils';
import { getRequest } from 'utils/apiClient';
import { DEFAULT_OFFSET, EMPTY_SEARCHER, FIRST_PAGE } from 'utils/consts';

import OrderLineDetails from './OrderLineDetails';

function OrderDetailsPage() {
  const [displayAddModal, setDisplayAddModal] = useState(false);
  const [displayEditModal, setDisplayEditModal] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [objectToEdit, setObjectToEdit] = useState({ id: null });
  const [objectToDelete, setObjectToDelete] = useState({ id: null });

  const [pageCount, setPageCount] = useState(0);
  const [numberOfAvailableData, setNumberOfAvailableData] = useState(0);
  const [page, setPage] = useState(FIRST_PAGE);
  const [data, setData] = useState([]);
  const [searcher, setSearcher] = useState(EMPTY_SEARCHER);
  const [lineItems, setLineItems] = useState();

  const isCleanupRef = useRef(false);
  const fetchIdRef = useRef(0);

  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);
  const columns: ColumnType[] = React.useMemo(() => [
    {
      Header: format('shipment.order_number.label'),
      accessor: 'order_details_id',
      width: 60,
      maxWidth: 60,
    },
    {
      Header: format('customer_type.column.name'),
      accessor: 'customer_name',
    },
    {
      Header: format('order_details.received_date.label'),
      accessor: 'order_received_date',
      Cell: ({ value }: any) => formatDate(new Date(value), 'MM/dd/yyyy'),
    },
  ], [format]);

  const {
    orderDetails,
  } = useSelector(
    (state: RootState) => state.orderDetails,
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
        const result = await getRequest(orderDetailsUrl, {
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
    if (orderDetails !== undefined) {
      setPage(FIRST_PAGE);
      setSearcher(EMPTY_SEARCHER);
      fetchData(FIRST_PAGE, DEFAULT_OFFSET, EMPTY_SEARCHER);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderDetails]);

  const refetch = (formValues: any) => {
    setPage(FIRST_PAGE);
    setSearcher(formValues.search);
  };

  const toggleAddModal = () => {
    setDisplayAddModal(!displayAddModal);
  };

  const toggleEditModal = (object?: FieldValues, datas?: any) => {
    console.log('object', object);
    console.log('datas', datas);

    if (object && object.order_details_id !== undefined) {
      const record = datas.find(
        (data_record: any) => data_record.order_details_id === object.order_details_id,
      );
      record.line_items.item_master = {
        id: record.line_items.product,
        name: record.line_items.product_name,
      };
      console.log('record', record);
      setLineItems(record.line_items);
      setObjectToEdit((prevState) => ({
        ...prevState,
        id: record.order_details_id,
        order_details_id: record.order_details_id,
        line_items: [{
          id: record.line_items.id,
          order_details: record.line_items.order_details,
          product: { id: record.line_items.product, name: record.line_items.product_name },
          item_details: record.line_items.item_details,
          quantity: record.line_items.quantity,
          old_quantity: record.line_items.old_quantity,
          product_name: record.line_items.product_name,
          batch_number: record.line_items.batch_number,
        }],
        customer: { id: record.customer, name: record.customer_name },
        order_received_date: record.order_received_date
          ? new Date(record.order_received_date) : null,
        customer_name: record.customer_name,
      }));
    }
    setDisplayEditModal(!displayEditModal);
  };
  console.log('objectToEdit', objectToEdit);

  const toggleDeleteModal = (object?: FieldValues) => {
    if (object) {
      setObjectToDelete((prevState) => ({
        ...prevState,
        id: object.id,
      }));
    }
    setDisplayDeleteModal(!displayDeleteModal);
  };

  const onSubmitAdd = (formValues: FieldValues) => {
    const payload = formValues;
    payload.customer_type = formValues.customer_type.id;
    // dispatch(postCustomerMasterRequest(payload as PostCustomerMasterRequestPayload));
    toggleAddModal();
  };

  const onSubmitEdit = (formValues: FieldValues) => {
    const payload = formValues;
    if (objectToEdit) {
      payload.id = objectToEdit.id;
    }
    payload.customer_type = formValues.customer_type.id;
    // dispatch(putCustomerMasterRequest(payload as PutCustomerMasterRequestPayload));

    // if (customerDeliveryHours) {
    //   const payloadDeliveryHours = { week_days: customerDeliveryHours, id: objectToEdit.id };
    //   dispatch(
    //     // @ts-ignore
    //     postCustomerWeekDaysRequest(payloadDeliveryHours as PostCustomerWeekDaysRequestPayload),
    //   );
    // }
    toggleEditModal();
  };

  const onDelete = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToDelete) {
      paramsToPass.id = objectToDelete.id;
    }
    // dispatch(deleteCustomerMasterRequest(paramsToPass as DeleteCustomerMasterRequestPayload));
    toggleDeleteModal();
  };

  const onDeleteSubmitEdit = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToEdit) {
      paramsToPass.id = objectToEdit.id;
    }

    // dispatch(deleteCustomerMasterRequest(paramsToPass as DeleteCustomerMasterRequestPayload));
    toggleEditModal();
  };

  return (
    <>
      <PageBody title={format(PageHeader.order_details)}>
        <div className="p-4 bg-transit-white">
          <Searcher refetch={refetch} />
        </div>
        {data === undefined ? (
          <Table columns={columns} data={[{}]}>
            <p>
              0
              {format('app.results')}
            </p>
            <AddItemButton onClick={toggleAddModal} className="w-fit p-2">
              <AiOutlinePlus className="text-transit-white" />
            </AddItemButton>
          </Table>
        ) : (
          <Table
            columns={columns}
            data={data}
            editAction={toggleEditModal}
            deleteAction={toggleDeleteModal}
            fetchData={fetchData}
            search={searcher}
            isCleanupRef={isCleanupRef}
            pageCount={pageCount}
            numberOfAvailableData={numberOfAvailableData}
            defaultOffset={DEFAULT_OFFSET}
            currentPage={page}
          >
            <p>{`${numberOfAvailableData} ${format('app.results')}`}</p>
            <AddItemButton onClick={toggleAddModal} className="w-fit p-2">
              <AiOutlinePlus className="text-transit-white" />
            </AddItemButton>
          </Table>
        )}
      </PageBody>
      <Dialog
        isOpen={displayAddModal || displayEditModal}
        onClose={displayAddModal ? toggleAddModal : toggleEditModal}
        setCustomDialogContent
        // eslint-disable-next-line
        children={[
          <OrderDetailsForm
            onSubmit={displayAddModal ? onSubmitAdd : onSubmitEdit}
            onCancel={displayAddModal ? toggleAddModal : toggleEditModal}
            title={displayAddModal ? `${format('app.new')} ${format('order_details.header')}` : `${format('app.edit')} ${format('order_details.header')}`}
            initialFormValue={displayAddModal ? {} : objectToEdit}
            mode={displayAddModal ? 'Add' : 'Edit'}
            submitButtonText={displayAddModal ? format('app.add') : format('app.save')}
            onDelete={onDeleteSubmitEdit}
          >
            <OrderLineDetails
              lineItemsData={displayAddModal ? undefined : lineItems}
              initialFormValue={displayAddModal ? undefined : objectToEdit}
              mode={displayAddModal ? 'Add' : 'Edit'}
            />
          </OrderDetailsForm>,
        ]}
      />
      <Dialog
        isOpen={displayDeleteModal}
        onClose={toggleDeleteModal}
        setCustomDialogContent
        // eslint-disable-next-line
        children={[
          <OrderDetailsForm
            onSubmit={onDelete}
            onCancel={toggleDeleteModal}
            title={`${format('app.delete')} ${format('order_details.header')}`}
            initialFormValue={objectToDelete}
            submitButtonText={format('app.delete')}
            mode="Delete"
          />,
        ]}
      />
    </>
  );
}

export default OrderDetailsPage;
