import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { FieldValues } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import OrderDetailsForm from 'components/forms/orderDetails/OrderDetailsForm';
import PageBody from 'components/shared/PageBody';
import Searcher from 'components/shared/Searcher';
import Table from 'components/shared/table/Table';
import { ColumnType } from 'components/shared/table/types';
import { ErrorMessage, showToast, SuccessSaved } from 'components/shared/Toast';
import PageHeader from 'pages/types';
import AddItemButton from 'shared/buttons/AddItemButton';
import Dialog from 'shared/dialog/Dialog';
import { deleteOrderDetailsRequest, postOrderDetailsRequest, putOrderDetailsRequest } from 'stores/actions/orderDetails/orderDetailsActions';
import OrderDetailsActionTypes from 'stores/actions/orderDetails/orderDetailsTypes';
import { postOrderLineDetailsRequest } from 'stores/actions/orderLineDetails/orderLineDetailsActions';
import { RootState } from 'stores/reducers/rootReducer';
import { orderDetailsUrl } from 'stores/sagas/orderDetailsSaga';
import refreshAccessToken from 'stores/sagas/utils';
import store from 'stores/store';
import { DeleteOrderDetailsRequestPayload, PostOrderDetailsRequestPayload, PutOrderDetailsRequestPayload } from 'stores/types/orderDetailsType';
import { PostOrderLineDetailsRequestPayload } from 'stores/types/orderLineDetails';
import { getRequest } from 'utils/apiClient';
import columnsRender from 'utils/columnsRender';
import { DEFAULT_OFFSET, EMPTY_SEARCHER, FIRST_PAGE } from 'utils/consts';

import OrderLineDetails from '../../../components/forms/orderDetails/OrderLineDetails';

import orderDetailsColumns from './orderdetailsColumns';

function OrderDetailsPage() {
  const [displayAddModal, setDisplayAddModal] = useState(false);
  const [displayEditModal, setDisplayEditModal] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [objectToEdit, setObjectToEdit] = useState({ id: null, order_details_id: null });
  const [objectToDelete, setObjectToDelete] = useState({ id: null, order_details_id: null });
  const [currentOrderLineDetails, setCurrentOrderLineDetails] = useState<any[]>([]);

  const [pageCount, setPageCount] = useState(0);
  const [numberOfAvailableData, setNumberOfAvailableData] = useState(0);
  const [page, setPage] = useState(FIRST_PAGE);
  const [data, setData] = useState([]);
  const [searcher, setSearcher] = useState(EMPTY_SEARCHER);

  const isCleanupRef = useRef(false);
  const fetchIdRef = useRef(0);

  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const dispatch = useDispatch();

  const columns: ColumnType[] = React.useMemo(
    () => (columnsRender(orderDetailsColumns, format)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [format],
  );

  const {
    orderDetail,
  } = useSelector(
    (state: RootState) => state.orderDetails,
  );

  // @ts-ignore
  const stateType = store.getState().orderDetails.type;

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
    if (orderDetail !== undefined) {
      setPage(FIRST_PAGE);
      setSearcher(EMPTY_SEARCHER);
      fetchData(FIRST_PAGE, DEFAULT_OFFSET, EMPTY_SEARCHER);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderDetail]);

  useEffect(() => {
    if (
      stateType === OrderDetailsActionTypes.PUT_ORDER_DETAILS_FAILURE
      || stateType === OrderDetailsActionTypes.POST_ORDER_DETAILS_FAILURE
      || stateType === OrderDetailsActionTypes.DELETE_ORDER_DETAILS_FAILURE) {
      showToast(<ErrorMessage />, 'error');
    } else if (stateType === OrderDetailsActionTypes.POST_ORDER_DETAILS_SUCCESS) {
      showToast(<SuccessSaved successMessage={`${format('order_details.header')} ${format('toast.success_created.message')}`} />, 'success');
    } else if (
      stateType === OrderDetailsActionTypes.PUT_ORDER_DETAILS_SUCCESS
      || stateType === OrderDetailsActionTypes.DELETE_ORDER_DETAILS_SUCCESS) {
      showToast(<SuccessSaved successMessage={format('toast.success_saved.message')} />, 'success');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format, stateType]);

  const refetch = (formValues: any) => {
    setPage(FIRST_PAGE);
    setSearcher(formValues.search);
  };

  const toggleAddModal = () => {
    setDisplayAddModal(!displayAddModal);
  };

  const toggleEditModal = (object?: FieldValues, datas?: any) => {
    if (object && object.order_details_id !== undefined) {
      const record = datas.find(
        (data_record: any) => data_record.order_details_id === object.order_details_id,
      );

      setObjectToEdit((prevState) => ({
        ...prevState,
        id: record.order_details_id,
        order_details_id: record.order_details_id,
        customer: { id: record.customer, name: record.customer_name },
        order_received_date: record.order_received_date
          ? new Date(record.order_received_date) : null,
        customer_name: record.customer_name,
      }));
    }
    setDisplayEditModal(!displayEditModal);
  };

  const toggleDeleteModal = (object?: FieldValues) => {
    if (object) {
      setObjectToDelete((prevState) => ({
        ...prevState,
        id: object.order_details_id,
      }));
    }
    setDisplayDeleteModal(!displayDeleteModal);
  };

  const onSubmitAdd = (formValues: FieldValues) => {
    const payload = formValues;
    payload.customer = formValues.customer.id;
    payload.customer_name = formValues.customer.name;
    payload.line_items = currentOrderLineDetails;

    dispatch(postOrderDetailsRequest(payload as PostOrderDetailsRequestPayload));
    toggleAddModal();
  };

  const onSubmitEdit = (formValues: FieldValues) => {
    const payload = formValues;
    if (objectToEdit) {
      payload.id = objectToEdit.id;
      payload.customer = formValues.customer.id;
    }
    dispatch(putOrderDetailsRequest(payload as PutOrderDetailsRequestPayload));

    if (currentOrderLineDetails) {
      const payloadOrderLineItems = {
        line_items: currentOrderLineDetails,
        id: objectToEdit.order_details_id,
      };

      dispatch(
        // @ts-ignore
        postOrderLineDetailsRequest(payloadOrderLineItems as PostOrderLineDetailsRequestPayload),
      );
    }
    toggleEditModal();
  };

  const onDelete = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToDelete) {
      paramsToPass.id = objectToDelete.id;
    }
    dispatch(deleteOrderDetailsRequest(paramsToPass as DeleteOrderDetailsRequestPayload));
    toggleDeleteModal();
  };

  const onDeleteSubmitEdit = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToEdit) {
      paramsToPass.id = objectToEdit.id;
    }

    dispatch(deleteOrderDetailsRequest(paramsToPass as DeleteOrderDetailsRequestPayload));
    toggleEditModal();
  };

  const handleCurrentOrderLineDetails = useCallback((lineItems: any) => {
    setCurrentOrderLineDetails(lineItems);
  }, []);

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
              mode={displayAddModal ? 'Add' : 'Edit'}
              orderDetailsId={displayAddModal ? null : objectToEdit.order_details_id}
              onLineItemsChange={handleCurrentOrderLineDetails}
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
