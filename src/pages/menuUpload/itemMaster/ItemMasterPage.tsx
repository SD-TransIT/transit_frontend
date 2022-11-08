import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { FieldValues } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { ErrorMessage, showToast, SuccessSaved } from 'components/shared/Toast';
import {
  deleteItemRequest,
  postItemRequest,
  putItemRequest,
} from 'stores/actions/item/itemActions';
import ItemActionTypes from 'stores/actions/item/itemTypes';
import { RootState } from 'stores/reducers/rootReducer';
import { itemUrl } from 'stores/sagas/itemSaga';
import refreshAccessToken from 'stores/sagas/utils';
import store from 'stores/store';
import {
  DeleteItemRequestPayload, PostItemRequestPayload, PutItemRequestPayload,
} from 'stores/types/itemType';
import { getRequest } from 'utils/apiClient';
import calculatePagesCount from 'utils/calculatePageCount';
import columnsRender from 'utils/columnsRender';
import { DEFAULT_OFFSET, EMPTY_SEARCHER, FIRST_PAGE } from 'utils/consts';

import ItemForm from '../../../components/forms/item/ItemForm';
import AddItemButton from '../../../components/shared/buttons/AddItemButton';
import Dialog from '../../../components/shared/dialog/Dialog';
import PageBody from '../../../components/shared/PageBody';
import Searcher from '../../../components/shared/Searcher';
import Table from '../../../components/shared/table/Table';
import { ColumnType } from '../../../components/shared/table/types';
import { IItem } from '../../../models/item/IItem';
import PageHeader from '../../types';

import itemMasterColumns from './itemMasterColumns';

const clearValues: IItem = { id: undefined, name: '', conditions: '' };

function ItemMasterPage() {
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

  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const {
    item,
  } = useSelector(
    (state: RootState) => state.item,
  );

  // @ts-ignore
  const stateType = store.getState().item.type;

  const columns: ColumnType[] = React.useMemo(
    () => (columnsRender(itemMasterColumns, format)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [format],
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

  useEffect(() => {
    if (
      stateType === ItemActionTypes.PUT_ITEM_FAILURE
      || stateType === ItemActionTypes.POST_ITEM_FAILURE
      || stateType === ItemActionTypes.DELETE_ITEM_FAILURE) {
      showToast(<ErrorMessage />, 'error');
    } else if (stateType === ItemActionTypes.POST_ITEM_SUCCESS) {
      showToast(<SuccessSaved successMessage={`${format('item_master.header')} ${format('toast.success_created.message')}`} />, 'success');
    } else if (
      stateType === ItemActionTypes.PUT_ITEM_SUCCESS
      || stateType === ItemActionTypes.DELETE_ITEM_SUCCESS) {
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
      <PageBody title={format(PageHeader.item_master)}>
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
          <ItemForm
            onSubmit={displayAddModal ? onSubmitAdd : onSubmitEdit}
            onCancel={displayAddModal ? toggleAddModal : toggleEditModal}
            title={displayAddModal ? `${format('app.new')} ${format('item_master.header')}` : `${format('app.edit')} ${format('item_master.header')}`}
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
          <ItemForm
            onSubmit={onDelete}
            onCancel={toggleDeleteModal}
            title={`${format('app.delete')} ${format('item')}`}
            initialFormValue={objectToDelete}
            submitButtonText={format('app.delete')}
            mode="Delete"
          />,
        ]}
      />
    </>
  );
}

export default ItemMasterPage;
