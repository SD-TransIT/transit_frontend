import React, { useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import PageBody from '../../../components/shared/PageBody';
import Searcher from '../../../components/shared/Searcher';
import Table from '../../../components/shared/table/Table';
import { ColumnType } from '../../../components/shared/table/types';
import {
  deleteSupplierMasterRequest,
  getSupplierMasterRequest,
  postSupplierMasterRequest,
  putSupplierMasterRequest,
} from '../../../redux/actions/supplierMaster/supplierMasterActions';
import { RootState } from '../../../redux/reducers/rootReducer';
import AddItemButton from '../../../shared/buttons/AddItemButton';
import Dialog from '../../../shared/dialog/Dialog';
import PageHeader from '../../types';
import SupplierMasterForm from '../../../components/forms/supplierMaster/SupplierMasterForm';
import supplierColumns from './columnsSupplier';
import { DeleteSupplierMasterRequestPayload, PostSupplierMasterRequestPayload, PutSupplierMasterRequestPayload } from '../../../redux/types/supplierMasterType';
import { ISupplierMaster } from '../../../models/supplierMaster/ISupplierMasterType';

function SupplierMasterPage() {
  const [displayAddModal, setDisplayAddModal] = useState(false);
  const [displayEditModal, setDisplayEditModal] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [objectToEdit, setObjectToEdit] = useState<ISupplierMaster>({
    id: undefined,
    name: '',

  });
  const [objectToDelete, setObjectToDelete] = useState<ISupplierMaster>({ id: undefined, name: '' });

  const dispatch = useDispatch();

  const columns: ColumnType[] = React.useMemo(() => supplierColumns, []);

  const {
    supplierMasters,
  } = useSelector(
    (state: RootState) => state.supplierMaster,
  );

  useEffect(() => {
    dispatch(getSupplierMasterRequest({ payload: {} }));
  }, [dispatch]);

  const refetch = (formValues: FieldValues) => {
    dispatch(getSupplierMasterRequest(formValues as any));
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
      <PageBody title={PageHeader.supplier_master}>
        <div className="p-4 bg-transit-white">
          <Searcher refetch={refetch} />
        </div>
        {supplierMasters === undefined ? (
          <Table columns={columns} data={[{ }]} editAction={() => {}}>
            <p>0 Results</p>
            <AddItemButton onClick={toggleAddModal} className="w-fit p-2">
              <AiOutlinePlus className="text-transit-white" />
            </AddItemButton>
          </Table>
        ) : (
          <Table
            columns={columns}
            data={supplierMasters}
            editAction={toggleEditModal}
            deleteAction={toggleDeleteModal}
          >
            <p>{`${supplierMasters?.length} Results`}</p>
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
            title={displayAddModal ? 'New Supplier Master' : 'Edit Supplier Master'}
            initialFormValue={objectToEdit}
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
          <SupplierMasterForm
            onSubmit={onDelete}
            onCancel={toggleDeleteModal}
            title="Delete Supplier Master"
            initialFormValue={objectToDelete}
            submitButtonText="Delete"
            mode="Delete"
          />,
        ]}
      />
    </>
  );
}

export default SupplierMasterPage;
