import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { FieldValues } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import CustomerTypeForm from 'components/forms/customerType/CustomerTypeForm';
import AddItemButton from 'components/shared/buttons/AddItemButton';
import Dialog from 'components/shared/dialog/Dialog';
import PageBody from 'components/shared/PageBody';
import Searcher from 'components/shared/Searcher';
import Table from 'components/shared/table/Table';
import { ColumnType } from 'components/shared/table/types';
import { ErrorMessage, showToast, SuccessSaved } from 'components/shared/Toast';
import PageHeader from 'pages/types';
import {
  deleteCustomerTypeRequest,
  postCustomerTypeRequest,
  putCustomerTypeRequest,
} from 'stores/actions/customerType/customerTypeActions';
import CustomerTypeActionTypes from 'stores/actions/customerType/customerTypeTypes';
import { RootState } from 'stores/reducers/rootReducer';
import { customerTypeUrl } from 'stores/sagas/customerTypeSaga';
import refreshAccessToken from 'stores/sagas/utils';
import store from 'stores/store';
import {
  DeleteCustomerTypeRequestPayload,
  PostCustomerTypeRequestPayload,
  PutCustomerTypeRequestPayload,
} from 'stores/types/customerType';
import { getRequest } from 'utils/apiClient';
import columnsRender from 'utils/columnsRender';
import { DEFAULT_OFFSET, EMPTY_SEARCHER, FIRST_PAGE } from 'utils/consts';

import customerTypeColumns from './customerTypeColumns';

function CustomerTypePage() {
  const [displayAddModal, setDisplayAddModal] = useState(false);
  const [displayEditModal, setDisplayEditModal] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [objectToEdit, setObjectToEdit] = useState({ id: null, customerTypeName: '' });
  const [objectToDelete, setObjectToDelete] = useState({ id: null });

  const [pageCount, setPageCount] = useState(0);
  const [numberOfAvailableData, setNumberOfAvailableData] = useState(0);
  const [page, setPage] = useState(FIRST_PAGE);
  const [data, setData] = useState([]);
  const [searcher, setSearcher] = useState(EMPTY_SEARCHER);

  const isCleanupRef = useRef(false);
  const fetchIdRef = useRef(0);

  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const columns: ColumnType[] = React.useMemo(
    () => (columnsRender(customerTypeColumns, format)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [format],
  );

  const dispatch = useDispatch();

  const {
    customerType,
  } = useSelector(
    (state: RootState) => state.customerType,
  );

  // @ts-ignore
  const stateType = store.getState().customerType.type;

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
        const result = await getRequest(customerTypeUrl, {
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
    if (customerType !== undefined) {
      setPage(FIRST_PAGE);
      setSearcher(EMPTY_SEARCHER);
      fetchData(FIRST_PAGE, DEFAULT_OFFSET, EMPTY_SEARCHER);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerType]);

  useEffect(() => {
    if (
      stateType === CustomerTypeActionTypes.PUT_CUSTOMER_TYPE_FAILURE
      || stateType === CustomerTypeActionTypes.POST_CUSTOMER_TYPE_FAILURE
      || stateType === CustomerTypeActionTypes.DELETE_CUSTOMER_TYPE_FAILURE) {
      showToast(<ErrorMessage />, 'error');
    } else if (stateType === CustomerTypeActionTypes.POST_CUSTOMER_TYPE_SUCCESS) {
      showToast(<SuccessSaved successMessage={`${format('customer_type.header')} ${format('toast.success_created.message')}`} />, 'success');
    } else if (
      stateType === CustomerTypeActionTypes.PUT_CUSTOMER_TYPE_SUCCESS
      || stateType === CustomerTypeActionTypes.DELETE_CUSTOMER_TYPE_SUCCESS) {
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

  const toggleEditModal = (object?:FieldValues) => {
    if (object) {
      setObjectToEdit((prevState) => ({
        ...prevState,
        id: object.id,
        customer_type_name: object.customer_type_name,
      }));
    }
    setDisplayEditModal(!displayEditModal);
  };

  const toggleDeleteModal = (object?:FieldValues) => {
    if (object) {
      setObjectToDelete((prevState) => ({
        ...prevState,
        id: object.id,
      }));
    }
    setDisplayDeleteModal(!displayDeleteModal);
  };

  const onSubmitAdd = (formValues: FieldValues) => {
    dispatch(postCustomerTypeRequest(formValues as PostCustomerTypeRequestPayload));
    toggleAddModal();
  };

  const onSubmitEdit = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToEdit) {
      paramsToPass.id = objectToEdit.id;
    }
    dispatch(putCustomerTypeRequest(paramsToPass as PutCustomerTypeRequestPayload));
    toggleEditModal();
  };

  const onDelete = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToDelete) {
      paramsToPass.id = objectToDelete.id;
    }
    dispatch(deleteCustomerTypeRequest(paramsToPass as DeleteCustomerTypeRequestPayload));
    toggleDeleteModal();
  };

  const onDeleteSubmitEdit = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToEdit) {
      paramsToPass.id = objectToEdit.id;
    }
    dispatch(deleteCustomerTypeRequest(paramsToPass as DeleteCustomerTypeRequestPayload));
    toggleEditModal();
  };

  return (
    <>
      <PageBody title={format(PageHeader.customer_type)}>
        <div className="p-4 bg-transit-white">
          <Searcher refetch={refetch} />
        </div>
        {data === undefined ? (
          <Table columns={columns} data={[{ }]}>
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
          <CustomerTypeForm
            onSubmit={displayAddModal ? onSubmitAdd : onSubmitEdit}
            onCancel={displayAddModal ? toggleAddModal : toggleEditModal}
            title={displayAddModal ? `${format('app.new')} ${format('customer_type.header')}` : `${format('app.edit')} ${format('customer_type.header')}`}
            initialFormValue={displayAddModal ? {} : objectToEdit}
            mode={displayAddModal ? 'Add' : 'Edit'}
            submitButtonText={displayAddModal ? format('app.add') : format('app.save')}
            onDelete={onDeleteSubmitEdit}
          />,
        ]}
      />
      <Dialog
        isOpen={displayDeleteModal}
        onClose={toggleDeleteModal}
        setCustomDialogContent
        // eslint-disable-next-line
        children={[
          <CustomerTypeForm
            onSubmit={onDelete}
            onCancel={toggleDeleteModal}
            title={`${format('app.delete')} ${format('customer_type')}`}
            initialFormValue={objectToDelete}
            submitButtonText={format('app.delete')}
            mode="Delete"
          />,
        ]}
      />
    </>
  );
}

export default CustomerTypePage;
