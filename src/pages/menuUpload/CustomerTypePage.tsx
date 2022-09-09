import React, { useEffect, useState } from 'react';

import { FieldValues } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import CustomerTypeForm from 'components/forms/customerType/CustomerTypeForm';
import PageBody from 'components/shared/PageBody';
import Searcher from 'components/shared/Searcher';
import Table from 'components/shared/table/Table';
import { ColumnType } from 'components/shared/table/types';
import PageHeader from 'pages/types';
import AddItemButton from 'shared/buttons/AddItemButton';
import Dialog from 'shared/dialog/Dialog';
import {
  deleteCustomerTypeRequest,
  getCustomerTypeRequest,
  postCustomerTypeRequest,
  putCustomerTypeRequest,
} from 'stores/actions/customerType/customerTypeActions';
import { RootState } from 'stores/reducers/rootReducer';
import {
  DeleteCustomerTypeRequestPayload,
  PostCustomerTypeRequestPayload,
  PutCustomerTypeRequestPayload,
} from 'stores/types/customerType';

function CustomerTypePage() {
  const [displayAddModal, setDisplayAddModal] = useState(false);
  const [displayEditModal, setDisplayEditModal] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [objectToEdit, setObjectToEdit] = useState({ id: null, customerTypeName: '' });
  const [objectToDelete, setObjectToDelete] = useState({ id: null });

  const toggleAddModal = () => {
    setDisplayAddModal(!displayAddModal);
  };

  const toggleEditModal = (object?:FieldValues) => {
    if (object) {
      setObjectToEdit((prevState) => ({
        ...prevState,
        id: object.id,
        customerTypeName: object.customer_type_name,
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

  const dispatch = useDispatch();

  const {
    customerTypes,
  } = useSelector(
    (state: RootState) => state.customerType,
  );

  useEffect(() => {
    dispatch(getCustomerTypeRequest({ payload: {} }));
  }, [dispatch]);

  const refetch = (formValues: FieldValues) => {
    dispatch(getCustomerTypeRequest(formValues as any));
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

  const onSubmitDelete = (formValues: FieldValues) => {
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

  const columns: ColumnType[] = React.useMemo(() => [
    {
      Header: 'Id',
      accessor: 'id',
    },
    {
      Header: 'Name',
      accessor: 'customer_type_name',
    },
  ], []);

  return (
    <PageBody title={PageHeader.customer_type}>
      <div className="p-4 bg-transit-white">
        <Searcher refetch={refetch} />
      </div>
      <Dialog
        isOpen={displayAddModal}
        onClose={toggleAddModal}
        setCustomDialogContent
        // eslint-disable-next-line
        children={[
          <CustomerTypeForm
            onSubmit={onSubmitAdd}
            onCancel={toggleAddModal}
            title="New Customer Type"
            initialFormValue={{}}
            submitButtonText="Add"
            mode="Add"
          />,
        ]}
      />
      <Dialog
        isOpen={displayEditModal}
        onClose={toggleEditModal}
        setCustomDialogContent
        // eslint-disable-next-line
        children={[
          <CustomerTypeForm
            onSubmit={onSubmitEdit}
            onCancel={toggleEditModal}
            title="Edit Customer Type"
            initialFormValue={objectToEdit}
            submitButtonText="Save"
            mode="Edit"
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
            onSubmit={onSubmitDelete}
            onCancel={toggleDeleteModal}
            title="Delete Customer Type"
            initialFormValue={objectToDelete}
            submitButtonText="Delete"
            mode="Delete"
          />,
        ]}
      />
      {customerTypes === undefined ? (
        <Table
          columns={columns}
          data={[{ }]}
        >
          <p>0 Results</p>
          <AddItemButton onClick={toggleAddModal} className="w-fit p-2">
            <AiOutlinePlus className="text-transit-white" />
          </AddItemButton>
        </Table>
      ) : (
        <Table
          columns={columns}
          data={customerTypes}
          editAction={toggleEditModal}
          deleteAction={toggleDeleteModal}
        >
          <p>{`${customerTypes?.length} Results`}</p>
          <AddItemButton onClick={toggleAddModal} className="w-fit p-2">
            <AiOutlinePlus className="text-transit-white" />
          </AddItemButton>
        </Table>
      )}
    </PageBody>
  );
}

export default CustomerTypePage;
