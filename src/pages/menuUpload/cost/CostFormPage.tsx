import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

import _ from 'lodash';
import { FieldValues } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import CostForm from 'components/forms/cost/costForm';
import AddItemButton from 'components/shared/buttons/AddItemButton';
import Dialog from 'components/shared/dialog/Dialog';
import PageBody from 'components/shared/PageBody';
import Searcher from 'components/shared/Searcher';
import Table from 'components/shared/table/Table';
import { ColumnType } from 'components/shared/table/types';
import {
  ErrorMessage,
  showToast,
  SuccessSaved,
} from 'components/shared/Toast';
import PageHeader from 'pages/types';
import { bulkPutCostRequest, putCostRequest } from 'stores/actions/cost/costActions';
import CostActionTypes from 'stores/actions/cost/costTypes';
import { RootState } from 'stores/reducers/rootReducer';
import { getCostRequest } from 'stores/sagas/costSaga';
import refreshAccessToken from 'stores/sagas/utils';
import store from 'stores/store';
import { BulkPutCostRequestPayload, PutCostRequestPayload } from 'stores/types/costType';
import columnsRender from 'utils/columnsRender';
import {
  DEFAULT_OFFSET, EMPTY_SEARCHER, FIRST_PAGE,
} from 'utils/consts';

import costColumns from './costColumns';

function CostFormPage() {
  const [displayAddModal, setDisplayAddModal] = useState(false);
  const [displayEditModal, setDisplayEditModal] = useState(false);
  const [objectToEdit, setObjectToEdit] = useState({ id: null });

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
    () => (columnsRender(costColumns, format)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [format],
  );

  const {
    cost,
  } = useSelector(
    (state: RootState) => state.cost,
  );

  // @ts-ignore
  const stateType = store.getState().cost.type;

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
        const result = await getCostRequest({
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
    if (cost !== undefined) {
      setPage(FIRST_PAGE);
      setSearcher(EMPTY_SEARCHER);
      fetchData(FIRST_PAGE, DEFAULT_OFFSET, EMPTY_SEARCHER);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cost]);

  useEffect(() => {
    if (
      stateType === CostActionTypes.PUT_COST_FAILURE
      || stateType === CostActionTypes.BULK_PUT_COST_FAILURE
      || stateType === CostActionTypes.DELETE_COST_FAILURE) {
      showToast(<ErrorMessage />, 'error');
    } else if (stateType === CostActionTypes.BULK_PUT_COST_SUCCESS) {
      showToast(<SuccessSaved successMessage={`${format('cost.label')} ${format('toast.success_created.message')}`} />, 'success');
    } else if (
      stateType === CostActionTypes.PUT_COST_SUCCESS
      || stateType === CostActionTypes.DELETE_COST_SUCCESS) {
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
        supplier: record.supplier,
        driver: record.driver,
        transporter: { id: record.transporter_id, name: record.transporter_name },
        transporter_details: record.transporter_details,
        delivery_status: record.delivery_status,
        pod_status: record.pod_status,
        number_of_kilometers: record.number_of_kilometers,
        transporter_base_cost: record.transporter_base_cost,
        transporter_additional_cost: record.transporter_additional_cost,
        orders: record.order_ids,
      }));
    }
    setDisplayEditModal(!displayEditModal);
  };

  const buildAddCostsToShipmentPayload = (formValues: FieldValues) => {
    // build addCostsToShipment payload based on checked shipment
    const selectedShipments = Object.fromEntries(Object.entries(formValues)
      .filter(([key]) => key.includes('shipment-')));
    const mappedShipments = _.map(
      selectedShipments,
      (value, prop) => ({ id: Number(prop.split('-')[1]), value: value.toString() }
      ),
    ).filter(
      (shipment: any) => (shipment.value === 'true'
      ),
    );
    return mappedShipments.map((result: any) => ({
      id: Number(result.id),
      transporter_base_cost: formValues.transporter_base_cost,
      transporter_additional_cost: formValues.transporter_additional_cost,
      number_of_kilometers: formValues.number_of_kilometers,
    }));
  };

  const onSubmitAdd = (formValues: FieldValues) => {
    const payload = buildAddCostsToShipmentPayload(formValues);
    dispatch(bulkPutCostRequest(payload as unknown as BulkPutCostRequestPayload));
    toggleAddModal();
  };

  const onSubmitEdit = async (formValues: FieldValues) => {
    const payload = formValues;
    if (objectToEdit) {
      payload.id = objectToEdit.id;
    }
    payload.transporter = formValues.transporter.id;
    dispatch(putCostRequest(payload as PutCostRequestPayload));
    toggleEditModal();
  };

  return (
    <PageBody title={format(PageHeader.cost_form)}>
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
          deleteAction={() => {}}
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
          <CostForm
            onSubmit={displayAddModal ? onSubmitAdd : onSubmitEdit}
            onCancel={displayAddModal ? toggleAddModal : toggleEditModal}
            title={displayAddModal ? `${format('app.new')} ${format('cost.label')}` : `${format('app.edit')} ${format('cost.label')}`}
            initialFormValue={displayAddModal ? {} : objectToEdit}
            mode={displayAddModal ? 'Add' : 'Edit'}
            submitButtonText={displayAddModal ? format('app.add') : format('app.save')}
          />,
        ]}
      />
    </PageBody>
  );
}

export default CostFormPage;
