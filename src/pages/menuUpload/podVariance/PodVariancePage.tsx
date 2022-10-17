import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { FieldValues } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import PodVarianceForm from 'components/forms/podVariance/podVarianceForm';
import PageBody from 'components/shared/PageBody';
import Searcher from 'components/shared/Searcher';
import Table from 'components/shared/table/Table';
import { ColumnType } from 'components/shared/table/types';
import { ErrorMessage, showToast, SuccessSaved } from 'components/shared/Toast';
import PageHeader from 'pages/types';
import AddItemButton from 'shared/buttons/AddItemButton';
import Dialog from 'shared/dialog/Dialog';
import { deletePodVarianceRequest, postPodVarianceRequest, putPodVarianceRequest } from 'stores/actions/podVariance/podVarianceActions';
import PodVarianceActionTypes from 'stores/actions/podVariance/podVarianceTypes';
import { RootState } from 'stores/reducers/rootReducer';
import { podVarianceUrl } from 'stores/sagas/podVarianceSaga';
import refreshAccessToken from 'stores/sagas/utils';
import store from 'stores/store';
import { DeletePodVarianceRequestPayload, PostPodVarianceRequestPayload, PutPodVarianceRequestPayload } from 'stores/types/podVarianceType';
import { getRequest } from 'utils/apiClient';
import columnsRender from 'utils/columnsRender';
import { DEFAULT_OFFSET, EMPTY_SEARCHER, FIRST_PAGE } from 'utils/consts';

import podVarianceColumns from './podVarianceColumns';

function PodVariancePage() {
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
    () => (columnsRender(podVarianceColumns, format)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [format],
  );

  const {
    podVariance,
  } = useSelector(
    (state: RootState) => state.podVariance,
  );

  // @ts-ignore
  const stateType = store.getState().podVariance.type;

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
        const result = await getRequest(podVarianceUrl, {
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
    if (podVariance !== undefined) {
      setPage(FIRST_PAGE);
      setSearcher(EMPTY_SEARCHER);
      fetchData(FIRST_PAGE, DEFAULT_OFFSET, EMPTY_SEARCHER);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [podVariance]);

  useEffect(() => {
    if (
      stateType === PodVarianceActionTypes.PUT_POD_VARIANCE_FAILURE
      || stateType === PodVarianceActionTypes.POST_POD_VARIANCE_FAILURE
      || stateType === PodVarianceActionTypes.DELETE_POD_VARIANCE_FAILURE) {
      showToast(<ErrorMessage />, 'error');
    } else if (stateType === PodVarianceActionTypes.POST_POD_VARIANCE_SUCCESS) {
      showToast(<SuccessSaved successMessage={`${format('pod_variance')} ${format('toast.success_created.message')}`} />, 'success');
    } else if (
      stateType === PodVarianceActionTypes.PUT_POD_VARIANCE_SUCCESS
      || stateType === PodVarianceActionTypes.DELETE_POD_VARIANCE_SUCCESS) {
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
        shipment: { id: record.shipment, name: record.shipment },
        dso_type: record.dso_type,
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

  const buildPodDetailsPayload = (payload: any, mode: 'Add' | 'Edit') => payload.pod_variance_details.map(
    (podDetail: any) => ({
      ...(mode === 'Edit') ? { id: podDetail.id, pod_variance: payload.id } : {},
      order_line_details: mode === 'Edit' ? podDetail.order_line_details : podDetail.id,
      quantity: podDetail.quantity,
    }),
  );

  const onSubmitAdd = (formValues: FieldValues) => {
    const payload = formValues;
    payload.pod_variance_details = buildPodDetailsPayload(formValues, 'Add');
    payload.shipment = payload.shipment.id;
    dispatch(postPodVarianceRequest(payload as PostPodVarianceRequestPayload));
    toggleAddModal();
  };

  const onSubmitEdit = (formValues: FieldValues) => {
    const payload = formValues;
    if (objectToEdit) {
      payload.id = objectToEdit.id;
    }
    payload.shipment = formValues.shipment.id;
    payload.pod_variance_details = buildPodDetailsPayload(payload, 'Edit');
    dispatch(putPodVarianceRequest(payload as PutPodVarianceRequestPayload));
    toggleEditModal();
  };

  const onDelete = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToDelete) {
      paramsToPass.id = objectToDelete.id;
    }
    dispatch(deletePodVarianceRequest(paramsToPass as DeletePodVarianceRequestPayload));
    toggleDeleteModal();
  };

  const onDeleteSubmitEdit = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToEdit) {
      paramsToPass.id = objectToEdit.id;
    }
    dispatch(deletePodVarianceRequest(paramsToPass as DeletePodVarianceRequestPayload));
    toggleEditModal();
  };

  return (
    <>
      <PageBody title={format(PageHeader.pod_variance)}>
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
          <PodVarianceForm
            onSubmit={displayAddModal ? onSubmitAdd : onSubmitEdit}
            onCancel={displayAddModal ? toggleAddModal : toggleEditModal}
            title={displayAddModal ? `${format('app.new')} ${format('pod_variance.header')}` : `${format('app.edit')} ${format('pod_variance.header')}`}
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
          <PodVarianceForm
            onSubmit={onDelete}
            onCancel={toggleDeleteModal}
            title={`${format('app.delete')} ${format('pod_variance')}`}
            initialFormValue={objectToDelete}
            submitButtonText={format('app.delete')}
            mode="Delete"
          />,
        ]}
      />
    </>
  );
}

export default PodVariancePage;
