import React, { useEffect, useState } from 'react';

import { IModeOfTransport } from 'models/modeOfTransport/IModeOfTransport';
import { FieldValues } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import AddItemButton from 'shared/buttons/AddItemButton';
import Dialog from 'shared/dialog/Dialog';
import { PostModeOfTransportRequestPayload, PutModeOfTransportRequestPayload } from 'types/modeOfTransportType';

import {
  getModeOfTransportRequest,
  postModeOfTransportRequest,
  putModeOfTransportRequest,
} from 'actions/modeOfTransport/modeOfTransportAction';
import ModeOfTransportForm from 'components/forms/modeOfTransport/ModeOfTransportForm';
import PageBody from 'components/shared/PageBody';
import Searcher from 'components/shared/Searcher';
import Table from 'components/shared/table/Table';
import { ColumnType } from 'components/shared/table/types';
import { RootState } from 'reducers/rootReducer';

import PageHeader from '../../types';

import modeOfTransportColumns from './columnsModesOfTransport';

function ModeOfTransportMasterPage() {
  const [displayAddModal, setDisplayAddModal] = useState(false);
  const [displayEditModal, setDisplayEditModal] = useState(false);
  const [objectToEdit, setObjectToEdit] = useState<IModeOfTransport>();

  const dispatch = useDispatch();

  const columns: ColumnType[] = React.useMemo(() => modeOfTransportColumns, []);

  const {
    modes,
  } = useSelector(
    (state: RootState) => state.modeOfTransport,
  );

  useEffect(() => {
    dispatch(getModeOfTransportRequest({ payload: {} }));
  }, [dispatch]);

  const refetch = (formValues: IModeOfTransport) => {
    dispatch(getModeOfTransportRequest(formValues as any));
  };

  const toggleAddModal = () => {
    setDisplayAddModal(!displayAddModal);
  };

  const toggleEditModal = (object?: IModeOfTransport) => {
    if (object) {
      setObjectToEdit((prevState) => ({
        ...prevState,
        id: object.id,
        class_mode: object.class_mode,
        vehicle_type: object.vehicle_type,
      }));
    }
    setDisplayEditModal(!displayEditModal);
  };

  const onSubmitAdd = (formValues: FieldValues) => {
    dispatch(postModeOfTransportRequest(formValues as PostModeOfTransportRequestPayload));
    toggleAddModal();
  };

  const onSubmitEdit = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToEdit) {
      paramsToPass.id = objectToEdit.id;
    }
    dispatch(putModeOfTransportRequest(paramsToPass as PutModeOfTransportRequestPayload));
    toggleEditModal();
  };

  return (
    <>
      <PageBody title={PageHeader.mode_of_transport_master}>
        <div className="p-4 bg-transit-white">
          <Searcher refetch={refetch} />
        </div>
        {modes === undefined ? (
          <Table columns={columns} data={[{ }]}>
            <p>0 Results</p>
            <AddItemButton onClick={toggleAddModal} className="w-fit p-2">
              <AiOutlinePlus className="text-transit-white" />
            </AddItemButton>
          </Table>
        ) : (
          <Table
            columns={columns}
            data={modes}
            editAction={toggleEditModal}
            deleteAction={() => { }}
          >
            <p>{`${modes?.length} Results`}</p>
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
          <ModeOfTransportForm
            onSubmit={displayAddModal ? onSubmitAdd : onSubmitEdit}
            onCancel={displayAddModal ? toggleAddModal : toggleEditModal}
            title={displayAddModal ? 'New Mode of Transport Master' : 'Edit Mode of Transport Master'}
            initialFormValue={displayAddModal ? {} : objectToEdit}
            mode={displayAddModal ? 'Add' : 'Edit'}
            submitButtonText={displayAddModal ? 'Add' : 'Edit'}
            onDelete={() => {}}
          />,
        ]}
      />
    </>
  );
}

export default ModeOfTransportMasterPage;
