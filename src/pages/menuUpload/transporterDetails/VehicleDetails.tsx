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

import TransporterDetailsForm from 'components/forms/transporterDetails/transporterDetailsForm';
import AddItemButton from 'components/shared/buttons/AddItemButton';
import Dialog from 'components/shared/dialog/Dialog';
import Searcher from 'components/shared/Searcher';
import Table from 'components/shared/table/Table';
import { ColumnType } from 'components/shared/table/types';
import { ErrorMessage, showToast, SuccessSaved } from 'components/shared/Toast';
import { deleteTransporterDetailsRequest, postTransporterDetailsRequest, putTransporterDetailsRequest } from 'stores/actions/transporterDetails/transporterDetailsActions';
import TransporterDetailsActionTypes from 'stores/actions/transporterDetails/transporterDetailsTypes';
import { RootState } from 'stores/reducers/rootReducer';
import { transporterDetailsUrl } from 'stores/sagas/transporterDetailsSaga';
import refreshAccessToken from 'stores/sagas/utils';
import store from 'stores/store';
import { DeleteTransporterDetailsRequestPayload, PostTransporterDetailsRequestPayload, PutTransporterDetailsRequestPayload } from 'stores/types/transporterDetailsType';
import { getRequest } from 'utils/apiClient';
import calculatePagesCount from 'utils/calculatePageCount';
import columnsRender from 'utils/columnsRender';
import { DEFAULT_OFFSET, EMPTY_SEARCHER, FIRST_PAGE } from 'utils/consts';

import vehicleDetailsColumns from './vehicleDetailsColumns';

function VehicleDetails() {
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

  const columns: ColumnType[] = React.useMemo(
    () => (columnsRender(vehicleDetailsColumns, format)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [format],
  );

  const {
    transporterDetail,
  } = useSelector(
    (state: RootState) => state.transporterDetails,
  );

  // @ts-ignore
  const stateType = store.getState().transporterDetails.type;

  const fetchData = useCallback(async (pageNumber: number, pageSize: number, search: string) => {
    /* eslint-disable-next-line no-plusplus */
    const fetchId = ++fetchIdRef.current;

    isCleanupRef.current = false;

    try {
      if (fetchId === fetchIdRef.current) {
        await refreshAccessToken();
        const result = await getRequest(transporterDetailsUrl, {
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
    if (transporterDetail !== undefined) {
      setPage(FIRST_PAGE);
      setSearcher(EMPTY_SEARCHER);
      fetchData(FIRST_PAGE, DEFAULT_OFFSET, EMPTY_SEARCHER);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transporterDetail]);

  useEffect(() => {
    if (
      stateType === TransporterDetailsActionTypes.PUT_TRANSPORTER_DETAILS_FAILURE
      || stateType === TransporterDetailsActionTypes.POST_TRANSPORTER_DETAILS_FAILURE
      || stateType === TransporterDetailsActionTypes.DELETE_TRANSPORTER_DETAILS_FAILURE) {
      showToast(<ErrorMessage />, 'error');
    } else if (stateType === TransporterDetailsActionTypes.POST_TRANSPORTER_DETAILS_SUCCESS) {
      showToast(<SuccessSaved successMessage={`${format('transporter_details.header.label')} ${format('toast.success_created.message')}`} />, 'success');
    } else if (
      stateType === TransporterDetailsActionTypes.PUT_TRANSPORTER_DETAILS_SUCCESS
      || stateType === TransporterDetailsActionTypes.DELETE_TRANSPORTER_DETAILS_SUCCESS) {
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

  const toggleEditModal = (object?: FieldValues, datas?: any) => {
    if (object && object.id !== undefined) {
      const record = datas.find((data_record:any) => data_record.id === object.id);
      setObjectToEdit((prevState) => ({
        ...prevState,
        id: object.id,
        vehicle_number: record.vehicle_number,
        vehicle_capacity_volume: record.vehicle_capacity_volume,
        vehicle_capacity_weight: record.vehicle_capacity_weight,
        transporter: { id: record.transporter, name: record.transport_name },
        mode_of_transport: { id: record.mode_of_transport, vehicle_type: record.vehicle_type },
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
    payload.transporter = formValues.transporter.id;
    payload.mode_of_transport = formValues.mode_of_transport.id;
    dispatch(postTransporterDetailsRequest(payload as PostTransporterDetailsRequestPayload));
    toggleAddModal();
  };

  const onSubmitEdit = (formValues: FieldValues) => {
    const payload = formValues;
    if (objectToEdit) {
      payload.id = objectToEdit.id;
    }
    payload.transporter = formValues.transporter.id;
    payload.mode_of_transport = formValues.mode_of_transport.id;
    dispatch(putTransporterDetailsRequest(payload as PutTransporterDetailsRequestPayload));
    toggleEditModal();
  };

  const onDelete = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToDelete) {
      paramsToPass.id = objectToDelete.id;
    }
    dispatch(deleteTransporterDetailsRequest(
      paramsToPass as DeleteTransporterDetailsRequestPayload,
    ));
    toggleDeleteModal();
  };

  const onDeleteSubmitEdit = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToEdit) {
      paramsToPass.id = objectToEdit.id;
    }
    dispatch(deleteTransporterDetailsRequest(
      paramsToPass as DeleteTransporterDetailsRequestPayload,
    ));
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
          <TransporterDetailsForm
            onSubmit={displayAddModal ? onSubmitAdd : onSubmitEdit}
            onCancel={displayAddModal ? toggleAddModal : toggleEditModal}
            title={displayAddModal ? `${format('app.new')} ${format('transporter_details.header.label')}` : `${format('app.edit')} ${format('transporter_details.header.label')}`}
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
          <TransporterDetailsForm
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

export default VehicleDetails;
