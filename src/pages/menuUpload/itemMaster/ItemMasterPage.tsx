import React, { useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '../../../shared/dialog/Dialog';
import ItemForm from '../../../components/forms/item/ItemForm';
import PageBody from '../../../components/shared/PageBody';
import Searcher from '../../../components/shared/Searcher';
import Table from '../../../components/shared/table/Table';
import { ColumnType } from '../../../components/shared/table/types';
import { IItem } from '../../../models/item/IItem';
import {
  getItemRequest, postItemRequest, putItemRequest, deleteItemRequest,
} from '../../../redux/actions/item/itemActions';
import { RootState } from '../../../redux/reducers/rootReducer';
import { PostItemRequestPayload, PutItemRequestPayload, DeleteItemRequestPayload } from '../../../redux/types/itemType';
import AddItemButton from '../../../shared/buttons/AddItemButton';
import PageHeader from '../../types';
import itemColumns from './columnsItem';

const clearValues: IItem = { id: undefined, name: '', conditions: '' };

function ItemMasterPage() {
  const [displayAddModal, setDisplayAddModal] = useState(false);
  const [displayEditModal, setDisplayEditModal] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [objectToEdit, setObjectToEdit] = useState<IItem>(clearValues);
  const [objectToDelete, setObjectToDelete] = useState<IItem>(clearValues);

  const dispatch = useDispatch();

  const {
    items,
  } = useSelector(
    (state: RootState) => state.item,
  );

  const columns: ColumnType[] = React.useMemo(() => itemColumns, []);

  useEffect(() => {
    dispatch(getItemRequest({ payload: {} }));
  }, [dispatch]);

  const refetch = (formValues: FieldValues) => {
    dispatch(getItemRequest(formValues as any));
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
        {items === undefined ? (
          <Table columns={columns} data={[{ }]}>
            <p>0 Results</p>
            <AddItemButton onClick={() => {}} className="w-fit p-2">
              <AiOutlinePlus className="text-transit-white" />
            </AddItemButton>
          </Table>
        ) : (
          <Table
            columns={columns}
            data={items}
            editAction={toggleEditModal}
            deleteAction={toggleDeleteModal}
          >
            <p>{`${items?.length} Results`}</p>
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
