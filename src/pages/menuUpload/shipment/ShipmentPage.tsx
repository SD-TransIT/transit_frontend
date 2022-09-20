import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { FieldValues } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ShipmentDeleteForm from 'components/forms/shipment/ShipmentDeleteForm';
import PageBody from 'components/shared/PageBody';
import Searcher from 'components/shared/Searcher';
import Table from 'components/shared/table/Table';
import { ColumnType } from 'components/shared/table/types';
import PageHeader from 'pages/types';
import { Paths } from 'routes/paths';
import AddItemButton from 'shared/buttons/AddItemButton';
import Dialog from 'shared/dialog/Dialog';
import { deleteShipmentRequest } from 'stores/actions/shipment/shipmentActions';
import { RootState } from 'stores/reducers/rootReducer';
import { shipmentUrl } from 'stores/sagas/shipmentSaga';
import refreshAccessToken from 'stores/sagas/utils';
import { DeleteShipmentRequestPayload } from 'stores/types/shipmentType';
import { getRequest } from 'utils/apiClient';
import { DEFAULT_OFFSET, EMPTY_SEARCHER, FIRST_PAGE } from 'utils/consts';

function ShipmentPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [objectToDelete, setObjectToDelete] = useState({ id: null });

  const [pageCount, setPageCount] = useState(0);
  const [numberOfAvailableData, setNumberOfAvailableData] = useState(0);
  const [page, setPage] = useState(FIRST_PAGE);
  const [data, setData] = useState([]);
  const [searcher, setSearcher] = useState(EMPTY_SEARCHER);

  const isCleanupRef = useRef(false);
  const fetchIdRef = useRef(0);
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const columns: ColumnType[] = React.useMemo(() => [
    {
      Header: format('shipment.shipment_number.label'),
      accessor: 'id',
      width: 100,
      maxWidth: 100,
    },
    {
      Header: format('shipment.transporter_name.label'),
      accessor: 'transporter_name',
    },
    {
      Header: format('shipment.driver_name.label'),
      accessor: 'driver_name',
    },
    {
      Header: format('shipment.vehicle_number.label'),
      accessor: 'vehicle_number',
    },
    {
      Header: format('shipment.ship_date.label'),
      accessor: 'ship_date',
      width: 250,
      maxWidth: 250,
    },
    {
      Header: format('shipment.expected_delivery_date.label'),
      accessor: 'expected_delivery_date',
      width: 250,
      maxWidth: 250,
    },
    {
      Header: format('shipment.custom_route_number.label'),
      accessor: 'custom_route_number',
    },
    {
      Header: format('shipment.delay_justified.label'),
      accessor: 'delay_justified',
    },
    {
      Header: format('shipment.delivery_date.label'),
      accessor: 'delivery_date',
      width: 250,
      maxWidth: 250,
    },
    {
      Header: format('shipment.pod_status.label'),
      accessor: 'pod_status',
    },
    {
      Header: format('shipment.pod.label'),
      accessor: 'pod',
    },
    {
      Header: format('shipment.customer_name.label'),
      accessor: 'customer_name',
    },
  ], [format]);

  const {
    shipment,
  } = useSelector(
    (state: RootState) => state.shipment,
  );

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
        const result = await getRequest(shipmentUrl, {
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
    if (shipment !== undefined) {
      setPage(FIRST_PAGE);
      setSearcher(EMPTY_SEARCHER);
      fetchData(FIRST_PAGE, DEFAULT_OFFSET, EMPTY_SEARCHER);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shipment]);

  const refetch = (formValues: any) => {
    setPage(FIRST_PAGE);
    setSearcher(formValues.search);
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

  const onDelete = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToDelete) {
      paramsToPass.id = objectToDelete.id;
    }
    dispatch(deleteShipmentRequest(paramsToPass as DeleteShipmentRequestPayload));
    toggleDeleteModal();
  };

  return (
    <>
      <PageBody title={format(PageHeader.shipment)}>
        <div className="p-4 bg-transit-white">
          <Searcher refetch={refetch} />
        </div>
        {data === undefined ? (
          <Table columns={columns} data={[{ }]}>
            <p>
              0
              {format('app.results')}
            </p>
            <AddItemButton onClick={() => navigate(Paths.shipment_details_add)} className="w-fit p-2">
              <AiOutlinePlus className="text-transit-white" />
            </AddItemButton>
          </Table>
        ) : (
          <Table
            columns={columns}
            data={data}
            editAction={() => navigate(Paths.shipment_details_edit)}
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
            <AddItemButton onClick={() => navigate(Paths.shipment_details_add)} className="w-fit p-2">
              <AiOutlinePlus className="text-transit-white" />
            </AddItemButton>
          </Table>
        )}
      </PageBody>
      <Dialog
        isOpen={displayDeleteModal}
        onClose={toggleDeleteModal}
        setCustomDialogContent
        // eslint-disable-next-line
        children={[
          <ShipmentDeleteForm
            onSubmit={onDelete}
            onCancel={toggleDeleteModal}
            title={`${format('app.delete')} ${format('shipment')}`}
            initialFormValue={objectToDelete}
            submitButtonText={format('app.delete')}
            mode="Delete"
          />,
        ]}
      />
    </>
  );
}

export default ShipmentPage;
