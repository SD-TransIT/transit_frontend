import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { FieldValues } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import ModeOfTransportForm from 'components/forms/modeOfTransport/ModeOfTransportForm';
import AddItemButton from 'components/shared/buttons/AddItemButton';
import Dialog from 'components/shared/dialog/Dialog';
import PageBody from 'components/shared/PageBody';
import Searcher from 'components/shared/Searcher';
import Table from 'components/shared/table/Table';
import { ColumnType } from 'components/shared/table/types';
import { ErrorMessage, showToast, SuccessSaved } from 'components/shared/Toast';
import { IModeOfTransport } from 'models/modeOfTransport/IModeOfTransport';
import {
  deleteModeOfTransportRequest,
  postModeOfTransportRequest,
  putModeOfTransportRequest,
} from 'stores/actions/modeOfTransport/modeOfTransportAction';
import ModeOfTransportActionTypes from 'stores/actions/modeOfTransport/modeOfTransportTypes';
import { RootState } from 'stores/reducers/rootReducer';
import { modeOfTransportUrl } from 'stores/sagas/modeOfTransport';
import refreshAccessToken from 'stores/sagas/utils';
import store from 'stores/store';
import {
  DeleteModeOfTransportRequestPayload,
  PostModeOfTransportRequestPayload,
  PutModeOfTransportRequestPayload,
} from 'stores/types/modeOfTransportType';
import { getRequest } from 'utils/apiClient';
import calculatePagesCount from 'utils/calculatePageCount';
import columnsRender from 'utils/columnsRender';
import { DEFAULT_OFFSET, EMPTY_SEARCHER, FIRST_PAGE } from 'utils/consts';

import PageHeader from '../../types';

import modeOfTransportColumns from './modeOfTransportColumns';

function ModeOfTransportMasterPage() {
  const [displayAddModal, setDisplayAddModal] = useState(false);
  const [displayEditModal, setDisplayEditModal] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [objectToEdit, setObjectToEdit] = useState<IModeOfTransport>();
  const [objectToDelete, setObjectToDelete] = useState<IModeOfTransport>();

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

  const columns: ColumnType[] = React.useMemo(
    () => (columnsRender(modeOfTransportColumns, format)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [format],
  );

  const {
    mode,
  } = useSelector(
    (state: RootState) => state.modeOfTransport,
  );

  // @ts-ignore
  const stateType = store.getState().modeOfTransport.type;

  const fetchData = useCallback(async (pageNumber: number, pageSize: number, search: string) => {
    /* eslint-disable-next-line no-plusplus */
    const fetchId = ++fetchIdRef.current;

    isCleanupRef.current = false;

    try {
      if (fetchId === fetchIdRef.current) {
        await refreshAccessToken();
        const result = await getRequest(modeOfTransportUrl, {
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
    if (mode !== undefined) {
      setPage(FIRST_PAGE);
      setSearcher(EMPTY_SEARCHER);
      fetchData(FIRST_PAGE, DEFAULT_OFFSET, EMPTY_SEARCHER);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    if (
      stateType === ModeOfTransportActionTypes.PUT_MODE_OF_TRANSPORT_FAILURE
      || stateType === ModeOfTransportActionTypes.POST_MODE_OF_TRANSPORT_FAILURE
      || stateType === ModeOfTransportActionTypes.DELETE_MODE_OF_TRANSPORT_FAILURE) {
      showToast(<ErrorMessage />, 'error');
    } else if (stateType === ModeOfTransportActionTypes.POST_MODE_OF_TRANSPORT_SUCCESS) {
      showToast(<SuccessSaved successMessage={`${format('mode_of_transport.header')} ${format('toast.success_created.message')}`} />, 'success');
    } else if (
      stateType === ModeOfTransportActionTypes.PUT_MODE_OF_TRANSPORT_SUCCESS
      || stateType === ModeOfTransportActionTypes.DELETE_MODE_OF_TRANSPORT_SUCCESS) {
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

  const toggleDeleteModal = (object?: IModeOfTransport) => {
    if (object) {
      setObjectToDelete((prevState) => ({
        ...prevState,
        id: object.id,
      }));
    }
    setDisplayDeleteModal(!displayDeleteModal);
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

  const onDelete = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToDelete) {
      paramsToPass.id = objectToDelete.id;
    }
    dispatch(deleteModeOfTransportRequest(paramsToPass as DeleteModeOfTransportRequestPayload));
    toggleDeleteModal();
  };

  const onDeleteSubmitEdit = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToEdit) {
      paramsToPass.id = objectToEdit.id;
    }
    dispatch(deleteModeOfTransportRequest(paramsToPass as DeleteModeOfTransportRequestPayload));
    toggleEditModal();
  };

  return (
    <>
      <PageBody title={format(PageHeader.mode_of_transport_master)}>
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
            <p>{`${numberOfAvailableData} ${format('app.results')} `}</p>
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
            title={displayAddModal ? `${format('app.new')} ${format('mode_of_transport.header')}` : `${format('app.edit')} ${format('mode_of_transport.header')}`}
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
          <ModeOfTransportForm
            onSubmit={onDelete}
            onCancel={toggleDeleteModal}
            title={`${format('app.delete')} ${format('mode_of_transport')}`}
            initialFormValue={objectToDelete}
            submitButtonText={format('app.delete')}
            mode="Delete"
          />,
        ]}
      />
    </>
  );
}

export default ModeOfTransportMasterPage;
