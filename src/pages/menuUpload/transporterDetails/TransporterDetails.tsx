import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { FieldValues } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import TransporterForm from 'components/forms/transporter/transporterForm';
import Searcher from 'components/shared/Searcher';
import Table from 'components/shared/table/Table';
import { ColumnType } from 'components/shared/table/types';
import AddItemButton from 'shared/buttons/AddItemButton';
import Dialog from 'shared/dialog/Dialog';
import { deleteTransporterRequest, postTransporterRequest, putTransporterRequest } from 'stores/actions/transporter/transporterActions';
import { RootState } from 'stores/reducers/rootReducer';
import { transporterUrl } from 'stores/sagas/transporterSaga';
import refreshAccessToken from 'stores/sagas/utils';
import { DeleteTransporterRequestPayload, PostTransporterRequestPayload, PutTransporterRequestPayload } from 'stores/types/transporterType';
import { getRequest } from 'utils/apiClient';
import { DEFAULT_OFFSET, EMPTY_SEARCHER, FIRST_PAGE } from 'utils/consts';

function TransporterDetails() {
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

  const isCleanupRef = useRef(false);
  const fetchIdRef = useRef(0);

  const dispatch = useDispatch();

  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const columns: ColumnType[] = React.useMemo(() => [
    {
      Header: 'ID',
      accessor: 'id',
      width: 40,
      maxWidth: 40,
    },
    {
      Header: format('transporter.transporter_name.label'),
      accessor: 'name',
      width: 250,
      maxWidth: 250,
    },
    {
      Header: format('transporter.address_1.label'),
      accessor: 'address_1',
    },
    {
      Header: format('transporter.address_2.label'),
      accessor: 'address_2',
    },
    {
      Header: format('transporter.address_3.label'),
      accessor: 'address_3',
    },
    {
      Header: format('transporter.city.label'),
      accessor: 'city',
    },
    {
      Header: format('transporter.state.label'),
      accessor: 'state',
    },
    {
      Header: format('transporter.country.label'),
      accessor: 'country',
    },
    {
      Header: format('transporter.phone_number.label'),
      accessor: 'phone',
    },
    {
      Header: format('transporter.gps.label'),
      accessor: 'latitude_longitude',
    },
  ], [format]);

  const {
    transporter,
  } = useSelector(
    (state: RootState) => state.transporter,
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
        const result = await getRequest(transporterUrl, {
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
    if (transporter !== undefined) {
      setPage(FIRST_PAGE);
      setSearcher(EMPTY_SEARCHER);
      fetchData(FIRST_PAGE, DEFAULT_OFFSET, EMPTY_SEARCHER);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transporter]);

  const refetch = (formValues: any) => {
    setPage(FIRST_PAGE);
    setSearcher(formValues.search);
  };

  const toggleAddModal = () => {
    setDisplayAddModal(!displayAddModal);
  };

  const toggleEditModal = (object?: FieldValues, datas?: any) => {
    if (object && object.id !== undefined) {
      const record = datas.find((data_record:any) => data_record.id === object.id);
      setObjectToEdit((prevState) => ({
        ...prevState,
        id: object.id,
        name: record.name,
        address_1: record.address_1,
        address_2: record.address_2,
        address_3: record.address_3,
        city: record.city,
        state: record.state,
        country: record.country,
        phone: record.phone,
        latitude_longitude: record.latitude_longitude,
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
    const payload = formValues;
    dispatch(postTransporterRequest(payload as PostTransporterRequestPayload));
    toggleAddModal();
  };

  const onSubmitEdit = (formValues: FieldValues) => {
    const payload = formValues;
    if (objectToEdit) {
      payload.id = objectToEdit.id;
    }
    dispatch(putTransporterRequest(payload as PutTransporterRequestPayload));
    toggleEditModal();
  };

  const onDelete = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToDelete) {
      paramsToPass.id = objectToDelete.id;
    }
    dispatch(deleteTransporterRequest(paramsToPass as DeleteTransporterRequestPayload));
    toggleDeleteModal();
  };

  const onDeleteSubmitEdit = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToEdit) {
      paramsToPass.id = objectToEdit.id;
    }
    dispatch(deleteTransporterRequest(paramsToPass as DeleteTransporterRequestPayload));
    toggleEditModal();
  };

  return (
    <>
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
      <Dialog
        isOpen={displayAddModal || displayEditModal}
        onClose={displayAddModal ? toggleAddModal : toggleEditModal}
        setCustomDialogContent
        // eslint-disable-next-line
        children={[
          <TransporterForm
            onSubmit={displayAddModal ? onSubmitAdd : onSubmitEdit}
            onCancel={displayAddModal ? toggleAddModal : toggleEditModal}
            title={displayAddModal ? `${format('app.new')} ${format('transporter_details')}` : `${format('app.edit')} ${format('transporter_details')}`}
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
          <TransporterForm
            onSubmit={onDelete}
            onCancel={toggleDeleteModal}
            title={`${format('app.delete')} ${format('driver')}`}
            initialFormValue={objectToDelete}
            submitButtonText={format('app.delete')}
            mode="Delete"
          />,
        ]}
      />
    </>
  );
}

export default TransporterDetails;
