import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { format as formatDate } from 'date-fns';
import { FieldValues } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import ItemDetailForm from 'components/forms/itemDetail/ItemDetailForm';
import PageBody from 'components/shared/PageBody';
import Searcher from 'components/shared/Searcher';
import Table from 'components/shared/table/Table';
import { ColumnType } from 'components/shared/table/types';
import PageHeader from 'pages/types';
import AddItemButton from 'shared/buttons/AddItemButton';
import Dialog from 'shared/dialog/Dialog';
import { deleteItemDetailRequest, postItemDetailRequest, putItemDetailRequest } from 'stores/actions/item_detail/itemDetailActions';
import { RootState } from 'stores/reducers/rootReducer';
import { itemDetailUrl } from 'stores/sagas/itemDetailSaga';
import refreshAccessToken from 'stores/sagas/utils';
import { DeleteItemDetailRequestPayload, PostItemDetailRequestPayload, PutItemDetailRequestPayload } from 'stores/types/itemDetailType';
import { getRequest } from 'utils/apiClient';
import { DEFAULT_OFFSET, EMPTY_SEARCHER, FIRST_PAGE } from 'utils/consts';

function ItemDetailPage() {
  const [displayAddModal, setDisplayAddModal] = useState(false);
  const [displayEditModal, setDisplayEditModal] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [objectToEdit, setObjectToEdit] = useState({ id: null, name: null });
  const [objectToDelete, setObjectToDelete] = useState({ id: null, name: null });

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
      Header: format('item_details.name.label'),
      accessor: 'item_name',
      width: 350,
      maxWidth: 350,
    },
    {
      Header: format('item_details.manufacturing_date.label'),
      accessor: 'manufacturing_date',
      Cell: ({ value }: any) => formatDate(new Date(value), 'MM/dd/yyyy'),
    },
    {
      Header: format('item_details.received_date.label'),
      accessor: 'received_date',
      Cell: ({ value }: any) => formatDate(new Date(value), 'MM/dd/yyyy'),
    },
    {
      Header: format('item_details.expiry_date.label'),
      accessor: 'expiry_date',
      Cell: ({ value }: any) => formatDate(new Date(value), 'MM/dd/yyyy'),
    },
    {
      Header: format('item_details.batch_namber.label'),
      accessor: 'batch_number',
    },
    {
      Header: format('item_details.gtin.label'),
      accessor: 'gtin',
    },
    {
      Header: format('item_details.funding_sources.label'),
      accessor: 'funding_source',
    },
    {
      Header: format('item_details.lot_number.label'),
      accessor: 'lot_number',
    },
    {
      Header: format('item_details.serial_number.label'),
      accessor: 'serial_number',
    },
  ], [format]);

  const {
    itemDetail,
  } = useSelector(
    (state: RootState) => state.itemDetail,
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
        const result = await getRequest(itemDetailUrl, {
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
    if (itemDetail !== undefined) {
      setPage(FIRST_PAGE);
      setSearcher(EMPTY_SEARCHER);
      fetchData(FIRST_PAGE, DEFAULT_OFFSET, EMPTY_SEARCHER);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemDetail]);

  const refetch = (formValues: any) => {
    setPage(FIRST_PAGE);
    setSearcher(formValues.search);
  };

  const toggleAddModal = () => {
    setDisplayAddModal(!displayAddModal);
  };

  const toggleEditModal = (object?: FieldValues, datas?: any) => {
    if (object && object.id !== undefined) {
      const record = datas.find((data_record: any) => data_record.id === object.id);

      setObjectToEdit((prevState) => ({
        ...prevState,
        id: object.id,
        item: record.item,
        batch_number: object.batch_number,
        expiry_date: object.expiry_date ? new Date(object.expiry_date) : null,
        manufacturing_date: object.manufacturing_date ? new Date(object.manufacturing_date) : null,
        received_date: object.received_date ? new Date(object.received_date) : null,
        gtin: object.gtin,
        lot_number: object.lot_number,
        serial_number: object.serial_number,
        funding_source: object.funding_source,
        item_master: { id: record.item, name: record.item_name },
        name: record.item_name,
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

    if (formValues.gtin === '') {
      payload.gtin = null;
    }

    payload.item = formValues.item_master.id;
    dispatch(postItemDetailRequest(payload as PostItemDetailRequestPayload));
    toggleAddModal();
  };

  const onSubmitEdit = (formValues: FieldValues) => {
    const payload = formValues;
    if (objectToEdit) {
      payload.id = objectToEdit.id;
    }
    payload.item = formValues.item_master.id;
    dispatch(putItemDetailRequest(payload as PutItemDetailRequestPayload));
    toggleEditModal();
  };

  const onDelete = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToDelete) {
      paramsToPass.id = objectToDelete.id;
    }
    dispatch(deleteItemDetailRequest(paramsToPass as DeleteItemDetailRequestPayload));
    toggleDeleteModal();
  };

  const onDeleteSubmitEdit = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToEdit) {
      paramsToPass.id = objectToEdit.id;
    }
    dispatch(deleteItemDetailRequest(paramsToPass as DeleteItemDetailRequestPayload));
    toggleEditModal();
  };

  return (
    <>
      <PageBody title={format(PageHeader.item_details)}>
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
          <ItemDetailForm
            onSubmit={displayAddModal ? onSubmitAdd : onSubmitEdit}
            onCancel={displayAddModal ? toggleAddModal : toggleEditModal}
            title={displayAddModal ? `${format('app.new')} ${format('item_details')}` : `${format('app.edit')} ${format('item_details')}`}
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
          <ItemDetailForm
            onSubmit={onDelete}
            onCancel={toggleDeleteModal}
            title={`${format('app.delete')} ${format('item_details')}`}
            initialFormValue={objectToDelete}
            submitButtonText={format('app.delete')}
            mode="Delete"
          />,
        ]}
      />
    </>
  );
}

export default ItemDetailPage;
