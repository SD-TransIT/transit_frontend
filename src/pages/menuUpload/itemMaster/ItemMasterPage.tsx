import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { FieldValues } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import {
  deleteItemRequest,
  postItemRequest,
  putItemRequest,
} from 'stores/actions/item/itemActions';
import { RootState } from 'stores/reducers/rootReducer';
import refreshAccessToken from 'stores/sagas/utils';
import {
  DeleteItemRequestPayload, PostItemRequestPayload, PutItemRequestPayload,
} from 'stores/types/itemType';
import { getRequest } from 'utils/apiClient';

import ItemForm from '../../../components/forms/item/ItemForm';
import PageBody from '../../../components/shared/PageBody';
import Searcher from '../../../components/shared/Searcher';
import Table from '../../../components/shared/table/Table';
import { ColumnType } from '../../../components/shared/table/types';
import { IItem } from '../../../models/item/IItem';
import AddItemButton from '../../../shared/buttons/AddItemButton';
import Dialog from '../../../shared/dialog/Dialog';
import PageHeader from '../../types';

import itemColumns from './columnsItem';

const clearValues: IItem = { id: undefined, name: '', conditions: '' };

function ItemMasterPage() {
  const DEFAULT_OFFSET = 10;
  const FIRST_PAGE = 1;
  const EMPTY_SEARCHER = '';
  const itemUrl = 'item/';

  const [displayAddModal, setDisplayAddModal] = useState(false);
  const [displayEditModal, setDisplayEditModal] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [objectToEdit, setObjectToEdit] = useState<IItem>(clearValues);
  const [objectToDelete, setObjectToDelete] = useState<IItem>(clearValues);

  const [pageCount, setPageCount] = useState(0);
  const [numberOfAvailableData, setNumberOfAvailableData] = useState(0);
  const [page, setPage] = useState(FIRST_PAGE);
  const [data, setData] = useState([]);
  const [searcher, setSearcher] = useState(EMPTY_SEARCHER);

  const isCleanupRef = useRef(false);
  const fetchIdRef = useRef(0);

  const dispatch = useDispatch();

  const {
    item,
  } = useSelector(
    (state: RootState) => state.item,
  );

  const columns: ColumnType[] = React.useMemo(() => itemColumns, []);

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
        const result = await getRequest(itemUrl, {
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
    if (item !== undefined) {
      setPage(FIRST_PAGE);
      setSearcher(EMPTY_SEARCHER);
      fetchData(FIRST_PAGE, DEFAULT_OFFSET, EMPTY_SEARCHER);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const refetch = (formValues: any) => {
    setPage(FIRST_PAGE);
    setSearcher(formValues.search);
  };

  const toggleAddModal = () => {
    setDisplayAddModal(!displayAddModal);
  };

  const toggleEditModal = (object?: IItem) => {
    if (object) {
      setObjectToEdit((prevState) => ({
        ...prevState,
        id: object.id,
        name: object.name,
        volume: object.volume,
        cost: object.cost,
        weight: object.weight,
        category: object.category,
        sub_category: object.sub_category,
        conditions: { label: object.conditions, name: object.conditions },
      }));
    }
    setDisplayEditModal(!displayEditModal);
  };

  const toggleDeleteModal = (object?: IItem) => {
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
    payload.conditions = formValues.conditions.value;
    dispatch(postItemRequest(formValues as PostItemRequestPayload));
    toggleAddModal();
  };

  const onSubmitEdit = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToEdit) {
      paramsToPass.id = objectToEdit.id;
    }
    paramsToPass.conditions = formValues.conditions.value;
    dispatch(putItemRequest(paramsToPass as PutItemRequestPayload));
    toggleEditModal();
  };

  const onDelete = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToDelete) {
      paramsToPass.id = objectToDelete.id;
    }
    dispatch(deleteItemRequest(paramsToPass as DeleteItemRequestPayload));
    toggleDeleteModal();
  };

  const onDeleteSubmitEdit = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToEdit) {
      paramsToPass.id = objectToEdit.id;
    }
    dispatch(deleteItemRequest(paramsToPass as DeleteItemRequestPayload));
    toggleEditModal();
  };

  return (
    <>
      <PageBody title={PageHeader.item_master}>
        <div className="p-4 bg-transit-white">
          <Searcher refetch={refetch} />
        </div>
        {data === undefined ? (
          <Table columns={columns} data={[{ }]}>
            <p>0 Results</p>
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
            <p>{`${numberOfAvailableData} Results`}</p>
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
          <ItemForm
            onSubmit={displayAddModal ? onSubmitAdd : onSubmitEdit}
            onCancel={displayAddModal ? toggleAddModal : toggleEditModal}
            title={displayAddModal ? 'New Item Master' : 'Edit Item Master'}
            initialFormValue={displayAddModal ? clearValues : objectToEdit}
            mode={displayAddModal ? 'Add' : 'Edit'}
            submitButtonText={displayAddModal ? 'Add' : 'Edit'}
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
          <ItemForm
            onSubmit={onDelete}
            onCancel={toggleDeleteModal}
            title="Delete Item Master"
            initialFormValue={objectToDelete}
            submitButtonText="Delete"
            mode="Delete"
          />,
        ]}
      />
    </>
  );
}

export default ItemMasterPage;
