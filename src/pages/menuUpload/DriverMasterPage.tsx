import React, { useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import DriverForm from 'components/forms/driver/DriverForm';
import PageBody from 'components/shared/PageBody';
import Searcher from 'components/shared/Searcher';
import Table from 'components/shared/table/Table';
import { ColumnType } from 'components/shared/table/types';
import {
  deleteDriverRequest, getDriverRequest,
  postDriverRequest, putDriverRequest,
} from 'actions/driver/driverActions';
import { RootState } from 'reducers/rootReducer';
import {
  DeleteDriverRequestPayload,
  PostDriverRequestPayload,
  PutDriverRequestPayload,
} from 'types/driverType';
import AddItemButton from 'shared/buttons/AddItemButton';
import Dialog from 'shared/dialog/Dialog';
import PageHeader from 'pages/types';

function DriverMasterPage() {
  const dispatch = useDispatch();

  const {
    drivers,
  } = useSelector(
    (state: RootState) => state.driver,
  );

  const [displayAddModal, setDisplayAddModal] = useState(false);
  const [displayEditModal, setDisplayEditModal] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [objectToEdit, setObjectToEdit] = useState({ id: null });
  const [objectToDelete, setObjectToDelete] = useState({ id: null });

  const toggleAddModal = () => {
    setDisplayAddModal(!displayAddModal);
  };

  const toggleEditModal = (object?:FieldValues, data?:any) => {
    if (object && object.id !== undefined) {
      const record = data.find((data_record:any) => data_record.id === object.id);
      setObjectToEdit((prevState) => ({
        ...prevState,
        id: object.id,
        name: record.name,
        username: record.username,
        transporter: { id: record.transporter, name: record.transporter_name },
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

  useEffect(() => {
    dispatch(getDriverRequest({ payload: {} }));
  }, [dispatch]);

  const refetch = (formValues: FieldValues) => {
    dispatch(getDriverRequest(formValues as any));
  };

  const onSubmitAdd = (formValues: FieldValues) => {
    const payload = formValues;
    payload.transporter = formValues.transporter.id;
    dispatch(postDriverRequest(payload as PostDriverRequestPayload));
    toggleAddModal();
  };

  const onSubmitEdit = (formValues: FieldValues) => {
    const payload = formValues;
    if (objectToEdit) {
      payload.id = objectToEdit.id;
    }
    payload.transporter = formValues.transporter.id;
    dispatch(putDriverRequest(payload as PutDriverRequestPayload));
    toggleEditModal();
  };

  const onSubmitDelete = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToDelete) {
      paramsToPass.id = objectToDelete.id;
    }
    dispatch(deleteDriverRequest(paramsToPass as DeleteDriverRequestPayload));
    toggleDeleteModal();
  };

  const onDeleteSubmitEdit = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToEdit) {
      paramsToPass.id = objectToEdit.id;
    }
    dispatch(deleteDriverRequest(paramsToPass as DeleteDriverRequestPayload));
    toggleEditModal();
  };

  const columns: ColumnType[] = React.useMemo(() => [
    {
      Header: 'Driver ID',
      accessor: 'id',
      width: 30,
      maxWidth: 30,
    },
    {
      Header: 'Transporter Name',
      accessor: 'transporter_name',
    },
    {
      Header: 'Driver Name',
      accessor: 'name',
    },
  ], []);

  return (
    <PageBody title={PageHeader.driver_master}>
      <div className="p-4 bg-transit-white">
        <Searcher refetch={refetch} />
      </div>
      <Dialog
        isOpen={displayAddModal}
        onClose={toggleAddModal}
        setCustomDialogContent
        // eslint-disable-next-line
        children={[
          <DriverForm
            onSubmit={onSubmitAdd}
            onCancel={toggleAddModal}
            title="New Driver Master"
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
          <DriverForm
            onSubmit={onSubmitEdit}
            onCancel={toggleEditModal}
            title="Edit Driver Master"
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
          <DriverForm
            onSubmit={onSubmitDelete}
            onCancel={toggleDeleteModal}
            title="Delete Driver Master"
            initialFormValue={objectToDelete}
            submitButtonText="Delete"
            mode="Delete"
          />,
        ]}
      />
      {drivers === undefined ? (
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
          data={drivers}
          editAction={toggleEditModal}
          deleteAction={toggleDeleteModal}
        >
          <p>{`${drivers?.length} Results`}</p>
          <AddItemButton onClick={toggleAddModal} className="w-fit p-2">
            <AiOutlinePlus className="text-transit-white" />
          </AddItemButton>
        </Table>
      )}
    </PageBody>
  );
}

export default DriverMasterPage;
