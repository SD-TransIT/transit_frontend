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
import { getRequest, getRequestFetchById } from 'utils/apiClient';
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
      width: 350,
      maxWidth: 350,
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

  const deliveryStatusOptions = [
    { value: 'delivered', label: format('shipment.delivery_status.delivered.label') },
    { value: 'not_delivered', label: format('shipment.delivery_status.not_delivered.label') },
  ];

  const podStatusOptions = [
    { value: 'client_not_present', label: 'Client not present' },
    { value: 'accident', label: 'Accident' },
    { value: 'robbery', label: 'Robbery' },
    { value: 'other', label: 'Other' },
    { value: 'pod_signed_complete', label: 'POD signed complete' },
    { value: 'pod_signed_dso', label: 'POD signed DSO' },
    { value: 'other', label: 'Other' },
  ];

  const editPageMappingInitState = async (object?: FieldValues) => data?.filter(
    (row: any) => (row.id === object?.id),
  ).map((row: any) => ({
    ...row,
    delivery_date: row.delivery_date ? new Date(row.delivery_date) : null,
    expected_delivery_date: (
      row.expected_delivery_date ? new Date(row.expected_delivery_date) : null
    ),
    ship_date: row.ship_date ? new Date(row.ship_date) : null,
    supplier: { id: row.supplier, name: row.supplier_name },
    transporter: { id: row.transporter_id, name: row.transporter_name },
    driver: { id: row.driver, name: row.driver_name },
    transporter_details: { id: row.transporter_details, vehicle_number: row.vehicle_number },
    delivery_status: {
      value: row.delivery_status,
      label: deliveryStatusOptions.find(
        (option: any) => option.value === row.delivery_status,
      )?.label,
    },
    pod_status: {
      value: row.pod_status,
      label: podStatusOptions.find(
        (option: any) => option.value === row.pod_status,
      )?.label,
    },
    orders: row.order_ids,
    customer_name: row.customer_name,
  }));

  const loadOrderDetails = async (orders: any, propsForEditPage: any) => {
    const fetchedOrderDetails: object [] = [];
    if (orders.length > 0) {
      orders.forEach(async (order: any, index: number) => {
        await refreshAccessToken();
        const response = await getRequestFetchById('order_details/', order);
        fetchedOrderDetails.push(response);
        if (index === orders.length - 1) {
          navigate(Paths.shipment_details_edit, {
            state: {
              propsForEditPage,
              fetchedOrderDetails,
            },
          });
        }
      });
    } else {
      navigate(Paths.shipment_details_edit, {
        state: {
          propsForEditPage,
          fetchedOrderDetails,
        },
      });
    }
  };

  const onEditPage = async (object?: FieldValues) => {
    const propsForEditPage = await editPageMappingInitState(object);
    await loadOrderDetails(propsForEditPage[0].orders, propsForEditPage);
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
            editAction={onEditPage}
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
