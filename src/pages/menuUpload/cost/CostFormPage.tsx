import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { AiOutlinePlus } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import PageBody from 'components/shared/PageBody';
import Searcher from 'components/shared/Searcher';
import Table from 'components/shared/table/Table';
import { ColumnType } from 'components/shared/table/types';
import PageHeader from 'pages/types';
import AddItemButton from 'shared/buttons/AddItemButton';
import { RootState } from 'stores/reducers/rootReducer';
import { shipmentWithoutCost } from 'stores/sagas/costSaga';
import refreshAccessToken from 'stores/sagas/utils';
import { getRequest } from 'utils/apiClient';
import { DEFAULT_OFFSET, EMPTY_SEARCHER, FIRST_PAGE } from 'utils/consts';

function CostFormPage() {
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
      Header: format('cost.shipment_number.label'),
      accessor: 'id',
      width: 150,
      maxWidth: 150,
    },
    {
      Header: format('cost.transporter_name.label'),
      accessor: 'transporter_name',
      width: 400,
      maxWidth: 400,
    },
    {
      Header: format('cost.driver_name.label'),
      accessor: 'driver_name',
      width: 250,
      maxWidth: 250,
    },
    {
      Header: format('cost.vehicle_number.label'),
      accessor: 'vehicle_number',
      width: 200,
      maxWidth: 200,
    },
    {
      Header: format('cost.transporter_base_cost.label'),
      accessor: 'transporter_base_cost',
      width: 200,
      maxWidth: 200,
    },
    {
      Header: format('cost.transporter_additional_cost.label'),
      accessor: 'transporter_additional_cost',
      width: 200,
      maxWidth: 200,
    },
  ], [format]);

  const {
    cost,
  } = useSelector(
    (state: RootState) => state.cost,
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
        const result = await getRequest(shipmentWithoutCost, {
          page: pageNumber,
          searcher: search,
        }, true);
        setPage(pageNumber);
        setData(result);
        setPageCount(calculatePagesCount(DEFAULT_OFFSET, result.length));
        setNumberOfAvailableData(result.length);
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

  const refetch = (formValues: any) => {
    setPage(FIRST_PAGE);
    setSearcher(formValues.search);
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
          <AddItemButton onClick={() => {}} className="w-fit p-2">
            <AiOutlinePlus className="text-transit-white" />
          </AddItemButton>
        </Table>
      ) : (
        <Table
          columns={columns}
          data={data}
          editAction={() => {}}
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
          <AddItemButton onClick={() => {}} className="w-fit p-2">
            <AiOutlinePlus className="text-transit-white" />
          </AddItemButton>
        </Table>
      )}
    </PageBody>
  );
}

export default CostFormPage;
