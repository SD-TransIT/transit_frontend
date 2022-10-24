import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { FieldValues } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import CustomerMasterForm from 'components/forms/customerMaster/CustomerMasterForm';
import AddItemButton from 'components/shared/buttons/AddItemButton';
import Dialog from 'components/shared/dialog/Dialog';
import PageBody from 'components/shared/PageBody';
import Searcher from 'components/shared/Searcher';
import Table from 'components/shared/table/Table';
import { ColumnType } from 'components/shared/table/types';
import { ErrorMessage, showToast, SuccessSaved } from 'components/shared/Toast';
import PageHeader from 'pages/types';
import {
  deleteCustomerMasterRequest,
  postCustomerMasterRequest,
  putCustomerMasterRequest,
} from 'stores/actions/customerMaster/customerMasterActions';
import CustomerMasterActionTypes from 'stores/actions/customerMaster/customerMasterTypes';
import {
  postCustomerWeekDaysRequest,
} from 'stores/actions/customerWeekDays/customerWeekDaysActions';
import { RootState } from 'stores/reducers/rootReducer';
import { customerMasterUrl } from 'stores/sagas/customerMasterSaga';
import refreshAccessToken from 'stores/sagas/utils';
import store from 'stores/store';
import {
  DeleteCustomerMasterRequestPayload,
  PostCustomerMasterRequestPayload,
  PutCustomerMasterRequestPayload,
} from 'stores/types/customerMasterType';
import {
  PostCustomerWeekDaysRequestPayload,
} from 'stores/types/customerWeekDays';
import { getRequest } from 'utils/apiClient';
import columnsRender from 'utils/columnsRender';
import { DEFAULT_OFFSET, EMPTY_SEARCHER, FIRST_PAGE } from 'utils/consts';

import CustomerMasterDeliveryHours from '../../../components/forms/customerMaster/CustomerMasterDeliveryHours';

import customerMasterColumns from './customerMasterColumns';

function CustomerMasterPage() {
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

  const [customerDeliveryHours, setCustomerDeliveryHours] = useState<any>();
  const isCleanupRef = useRef(false);
  const fetchIdRef = useRef(0);

  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const dispatch = useDispatch();

  const columns: ColumnType[] = React.useMemo(
    () => (columnsRender(customerMasterColumns, format)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [format],
  );

  const {
    customer,
  } = useSelector(
    (state: RootState) => state.customerMaster,
  );

  // @ts-ignore
  const stateType = store.getState().customerMaster.type;

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
        const result = await getRequest(customerMasterUrl, {
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
    if (customer !== undefined) {
      setPage(FIRST_PAGE);
      setSearcher(EMPTY_SEARCHER);
      fetchData(FIRST_PAGE, DEFAULT_OFFSET, EMPTY_SEARCHER);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer]);

  useEffect(() => {
    if (
      stateType === CustomerMasterActionTypes.PUT_CUSTOMER_MASTER_FAILURE
      || stateType === CustomerMasterActionTypes.POST_CUSTOMER_MASTER_FAILURE
      || stateType === CustomerMasterActionTypes.DELETE_CUSTOMER_MASTER_FAILURE) {
      showToast(<ErrorMessage />, 'error');
    } else if (stateType === CustomerMasterActionTypes.POST_CUSTOMER_MASTER_SUCCESS) {
      showToast(<SuccessSaved successMessage={`${format('customer')} ${format('toast.success_created.message')}`} />, 'success');
    } else if (
      stateType === CustomerMasterActionTypes.PUT_CUSTOMER_MASTER_SUCCESS
      || stateType === CustomerMasterActionTypes.DELETE_CUSTOMER_MASTER_SUCCESS) {
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
    setCustomerDeliveryHours([]);
  };

  const toggleEditModal = (object?: FieldValues, datas?: any) => {
    if (object && object.id !== undefined) {
      const record = datas.find((data_record: any) => data_record.id === object.id);
      setObjectToEdit((prevState) => ({
        ...prevState,
        id: object.id,
        name: object.name,
        first_name: object.first_name,
        last_name: object.last_name,
        customer_type: { id: record.customer_type, customer_type_name: record.customer_type_name },
        customer_type_name: record.customer_type_name,
        address_1: object.address_1,
        address_2: object.address_2,
        address_3: object.address_3,
        city: object.city,
        state: object.state,
        country: object.country,
        phone: object.phone,
        email: object.email,
        latitude_longitude: object.latitude_longitude,
        week_days: object.week_days,
      }));
    }
    setDisplayEditModal(!displayEditModal);
  };

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
    payload.week_days = customerDeliveryHours;
    dispatch(postCustomerMasterRequest(payload as PostCustomerMasterRequestPayload));
    toggleAddModal();
  };

  const onSubmitEdit = (formValues: FieldValues) => {
    const payload = formValues;
    if (objectToEdit) {
      payload.id = objectToEdit.id;
    }
    payload.customer_type = formValues.customer_type.id;
    dispatch(putCustomerMasterRequest(payload as PutCustomerMasterRequestPayload));

    if (customerDeliveryHours) {
      const payloadDeliveryHours = { week_days: customerDeliveryHours, id: objectToEdit.id };
      dispatch(
        // @ts-ignore
        postCustomerWeekDaysRequest(payloadDeliveryHours as PostCustomerWeekDaysRequestPayload),
      );
    }
    toggleEditModal();
  };

  const onDelete = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToDelete) {
      paramsToPass.id = objectToDelete.id;
    }
    dispatch(deleteCustomerMasterRequest(paramsToPass as DeleteCustomerMasterRequestPayload));
    toggleDeleteModal();
  };

  const onDeleteSubmitEdit = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToEdit) {
      paramsToPass.id = objectToEdit.id;
    }

    dispatch(deleteCustomerMasterRequest(paramsToPass as DeleteCustomerMasterRequestPayload));
    toggleEditModal();
  };

  const handleCustomerDeliveryHours = useCallback((deliveryHours: any) => {
    setCustomerDeliveryHours(deliveryHours);
  }, []);

  return (
    <>
      <PageBody title={format(PageHeader.customer_master)}>
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
          <CustomerMasterForm
            onSubmit={displayAddModal ? onSubmitAdd : onSubmitEdit}
            onCancel={displayAddModal ? toggleAddModal : toggleEditModal}
            title={displayAddModal ? `${format('app.new')} ${format('customer_master.header')}` : `${format('app.edit')} ${format('customer_master.header')}`}
            initialFormValue={displayAddModal ? {} : objectToEdit}
            mode={displayAddModal ? 'Add' : 'Edit'}
            submitButtonText={displayAddModal ? format('app.add') : format('app.save')}
            onDelete={onDeleteSubmitEdit}
          >
            <CustomerMasterDeliveryHours
              customerId={displayAddModal ? undefined : objectToEdit.id}
              onDeliveryHoursChange={handleCustomerDeliveryHours}
            />
          </CustomerMasterForm>,
        ]}
      />
      <Dialog
        isOpen={displayDeleteModal}
        onClose={toggleDeleteModal}
        setCustomDialogContent
        // eslint-disable-next-line
        children={[
          <CustomerMasterForm
            onSubmit={onDelete}
            onCancel={toggleDeleteModal}
            title={`${format('app.delete')} ${format('customer_master.header')}`}
            initialFormValue={objectToDelete}
            submitButtonText={format('app.delete')}
            mode="Delete"
          />,
        ]}
      />
    </>
  );
}

export default CustomerMasterPage;
