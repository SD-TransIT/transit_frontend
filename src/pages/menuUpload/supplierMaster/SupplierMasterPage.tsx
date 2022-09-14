import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { FieldValues } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import SupplierMasterForm from 'components/forms/supplierMaster/SupplierMasterForm';
import PageBody from 'components/shared/PageBody';
import Searcher from 'components/shared/Searcher';
import Table from 'components/shared/table/Table';
import { ColumnType } from 'components/shared/table/types';
import { ISupplierMaster } from 'models/supplierMaster/ISupplierMasterType';
import PageHeader from 'pages/types';
import AddItemButton from 'shared/buttons/AddItemButton';
import Dialog from 'shared/dialog/Dialog';
import {
  deleteSupplierMasterRequest,
  postSupplierMasterRequest,
  putSupplierMasterRequest,
} from 'stores/actions/supplierMaster/supplierMasterActions';
import { RootState } from 'stores/reducers/rootReducer';
import { supplierUrl } from 'stores/sagas/supplierMasterSaga';
import refreshAccessToken from 'stores/sagas/utils';
import {
  DeleteSupplierMasterRequestPayload,
  PostSupplierMasterRequestPayload,
  PutSupplierMasterRequestPayload,
} from 'stores/types/supplierMasterType';
import { getRequest } from 'utils/apiClient';
import { DEFAULT_OFFSET, EMPTY_SEARCHER, FIRST_PAGE } from 'utils/consts';

const clearValues: ISupplierMaster = { id: undefined, name: '' };

function SupplierMasterPage() {
  const [displayAddModal, setDisplayAddModal] = useState(false);
  const [displayEditModal, setDisplayEditModal] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [objectToEdit, setObjectToEdit] = useState<ISupplierMaster>(clearValues);
  const [objectToDelete, setObjectToDelete] = useState<ISupplierMaster>(clearValues);

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

  const columns: ColumnType[] = React.useMemo(() => [
    {
      Header: 'ID',
      accessor: 'id',
      width: 30,
      maxWidth: 30,
    },
    {
      Header: format('supplier_master.name.label'),
      accessor: 'name',
    },
    {
      Header: format('supplier_master.address_1.label'),
      accessor: 'address_1',
    },
    {
      Header: format('supplier_master.address_2.label'),
      accessor: 'address_2',
    },
    {
      Header: format('supplier_master.address_3.label'),
      accessor: 'address_3',
    },
    {
      Header: format('supplier_master.city.label'),
      accessor: 'city',
    },
    {
      Header: format('supplier_master.state.label'),
      accessor: 'state',
    },
    {
      Header: format('supplier_master.country.label'),
      accessor: 'country',
    },
    {
      Header: format('supplier_master.email.label'),
      accessor: 'email',
    },
    {
      Header: format('supplier_master.phone_number.label'),
      accessor: 'phone',
    },
    {
      Header: format('supplier_master.gps.label'),
      accessor: 'latitude_longitude',
    },
  ], [format]);

  const {
    supplierMaster,
  } = useSelector(
    (state: RootState) => state.supplierMaster,
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
        const result = await getRequest(supplierUrl, {
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
    if (supplierMaster !== undefined) {
      setPage(FIRST_PAGE);
      setSearcher(EMPTY_SEARCHER);
      fetchData(FIRST_PAGE, DEFAULT_OFFSET, EMPTY_SEARCHER);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplierMaster]);

  const refetch = (formValues: any) => {
    setPage(FIRST_PAGE);
    setSearcher(formValues.search);
  };

  const toggleAddModal = () => {
    setDisplayAddModal(!displayAddModal);
  };

  const toggleEditModal = (object?: ISupplierMaster) => {
    if (object) {
      setObjectToEdit((prevState) => ({
        ...prevState,
        id: object.id,
        name: object.name,
        address_1: object.address_1,
        address_2: object.address_2,
        address_3: object.address_3,
        city: object.city,
        state: object.state,
        country: object.country,
        phone: object.phone,
        email: object.email,
        latitude_longitude: object.latitude_longitude,
      }));
    }
    setDisplayEditModal(!displayEditModal);
  };

  const toggleDeleteModal = (object?: ISupplierMaster) => {
    if (object) {
      setObjectToDelete((prevState) => ({
        ...prevState,
        id: object.id,
      }));
    }
    setDisplayDeleteModal(!displayDeleteModal);
  };

  const onSubmitAdd = (formValues: FieldValues) => {
    dispatch(postSupplierMasterRequest(formValues as PostSupplierMasterRequestPayload));
    toggleAddModal();
  };

  const onSubmitEdit = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToEdit) {
      paramsToPass.id = objectToEdit.id;
    }
    dispatch(putSupplierMasterRequest(paramsToPass as PutSupplierMasterRequestPayload));
    toggleEditModal();
  };

  const onDelete = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToDelete) {
      paramsToPass.id = objectToDelete.id;
    }
    dispatch(deleteSupplierMasterRequest(paramsToPass as DeleteSupplierMasterRequestPayload));
    toggleDeleteModal();
  };

  const onDeleteSubmitEdit = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToEdit) {
      paramsToPass.id = objectToEdit.id;
    }
    dispatch(deleteSupplierMasterRequest(paramsToPass as DeleteSupplierMasterRequestPayload));
    toggleEditModal();
  };

  return (
    <>
      <PageBody title={format(PageHeader.supplier_master)}>
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
          <SupplierMasterForm
            onSubmit={displayAddModal ? onSubmitAdd : onSubmitEdit}
            onCancel={displayAddModal ? toggleAddModal : toggleEditModal}
            title={displayAddModal ? `${format('app.new')} ${format('supplier_master.header')}` : `${format('app.edit')} ${format('supplier_master.header')}`}
            initialFormValue={displayAddModal ? clearValues : objectToEdit}
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
          <SupplierMasterForm
            onSubmit={onDelete}
            onCancel={toggleDeleteModal}
            title={`${format('app.delete')} ${format('supplier')}`}
            initialFormValue={objectToDelete}
            submitButtonText={format('app.delete')}
            mode="Delete"
          />,
        ]}
      />
    </>
  );
}

export default SupplierMasterPage;
