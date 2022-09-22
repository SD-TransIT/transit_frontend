import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { FieldValues } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import CustomerMasterForm from 'components/forms/customerMaster/CustomerMasterForm';
import PageBody from 'components/shared/PageBody';
import Searcher from 'components/shared/Searcher';
import Table from 'components/shared/table/Table';
import { ColumnType } from 'components/shared/table/types';
import PageHeader from 'pages/types';
import AddItemButton from 'shared/buttons/AddItemButton';
import Dialog from 'shared/dialog/Dialog';
import {
  deleteCustomerMasterRequest,
  postCustomerMasterRequest,
  putCustomerMasterRequest,
} from 'stores/actions/customerMaster/customerMasterActions';
import {
  postCustomerWeekDaysRequest,
} from 'stores/actions/customerWeekDays/customerWeekDaysActions';
import { RootState } from 'stores/reducers/rootReducer';
import { customerMasterUrl } from 'stores/sagas/customerMasterSaga';
import refreshAccessToken from 'stores/sagas/utils';
import {
  DeleteCustomerMasterRequestPayload,
  PostCustomerMasterRequestPayload,
  PutCustomerMasterRequestPayload,
} from 'stores/types/customerMasterType';
import {
  PostCustomerWeekDaysRequestPayload,
} from 'stores/types/customerWeekDays';
import { getRequest } from 'utils/apiClient';
import { DEFAULT_OFFSET, EMPTY_SEARCHER, FIRST_PAGE } from 'utils/consts';

import CustomerMasterDeliveryHours from './CustomerMasterDeliveryHours';

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

  const columns: ColumnType[] = React.useMemo(() => [
    {
      Header: 'ID',
      accessor: 'id',
      width: 40,
      maxWidth: 40,
    },
    {
      Header: format('customer_master.customer_type_name.label'),
      accessor: 'customer_type_name',
      width: 160,
      maxWidth: 160,
    },
    {
      Header: format('customer_master.name.label'),
      accessor: 'name',
    },
    {
      Header: format('customer_master.first_name.label'),
      accessor: 'first_name',
    },
    {
      Header: format('customer_master.last_name.label'),
      accessor: 'last_name',
    },
    {
      Header: format('customer_master.address_1.label'),
      accessor: 'address_1',
    },
    {
      Header: format('customer_master.address_2.label'),
      accessor: 'address_2',
    },
    {
      Header: format('customer_master.address_3.label'),
      accessor: 'address_3',
    },
    {
      Header: format('customer_master.city.label'),
      accessor: 'city',
    },
    {
      Header: format('customer_master.state.label'),
      accessor: 'state',
    },
    {
      Header: format('customer_master.country.label'),
      accessor: 'country',
    },
    {
      Header: format('customer_master.email.label'),
      accessor: 'email',
    },
    {
      Header: format('customer_master.phone.label'),
      accessor: 'phone',
    },
    {
      Header: format('customer_master.gps.label'),
      accessor: 'latitude_longitude',
    },
  ], [format]);

  const {
    customer,
  } = useSelector(
    (state: RootState) => state.customerMaster,
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
