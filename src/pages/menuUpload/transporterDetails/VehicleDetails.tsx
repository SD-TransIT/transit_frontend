import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { AiOutlinePlus } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import Searcher from 'components/shared/Searcher';
import Table from 'components/shared/table/Table';
import { ColumnType } from 'components/shared/table/types';
import AddItemButton from 'shared/buttons/AddItemButton';
import { RootState } from 'stores/reducers/rootReducer';
import { transporterDetailsUrl } from 'stores/sagas/transporterDetails';
import refreshAccessToken from 'stores/sagas/utils';
import { getRequest } from 'utils/apiClient';
import { DEFAULT_OFFSET, EMPTY_SEARCHER, FIRST_PAGE } from 'utils/consts';

function VehicleDetails() {
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
      Header: 'ID',
      accessor: 'id',
      width: 40,
      maxWidth: 40,
    },
    {
      Header: format('transporter_details.transporter_name.label'),
      accessor: 'transporter_name',
      width: 140,
      maxWidth: 140,
    },
    {
      Header: format('transporter_details.vehicle_number.label'),
      accessor: 'vehicle_number',
      width: 250,
      maxWidth: 250,
    },
    {
      Header: format('transporter_details.vehicle_volume.label'),
      accessor: 'vehicle_capacity_volume',
      width: 250,
      maxWidth: 250,
    },
    {
      Header: format('transporter_details.vehicle_weight.label'),
      accessor: 'vehicle_capacity_weight',
      width: 250,
      maxWidth: 250,
    },
    {
      Header: format('transporter_details.mode_of_transport.label'),
      accessor: 'vehicle_type',
    },
  ], [format]);

  const {
    transportDetail,
  } = useSelector(
    (state: RootState) => state.transporterDetails,
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
    if (transportDetail !== undefined) {
      setPage(FIRST_PAGE);
      setSearcher(EMPTY_SEARCHER);
      fetchData(FIRST_PAGE, DEFAULT_OFFSET, EMPTY_SEARCHER);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transportDetail]);

  const refetch = (formValues: any) => {
    setPage(FIRST_PAGE);
    setSearcher(formValues.search);
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
          <AddItemButton onClick={() => { }} className="w-fit p-2">
            <AiOutlinePlus className="text-transit-white" />
          </AddItemButton>
        </Table>
      ) : (
        <Table
          columns={columns}
          data={data}
          editAction={() => { }}
          deleteAction={() => { }}
          fetchData={fetchData}
          search={searcher}
          isCleanupRef={isCleanupRef}
          pageCount={pageCount}
          numberOfAvailableData={numberOfAvailableData}
          defaultOffset={DEFAULT_OFFSET}
          currentPage={page}
        >
          <p>{`${numberOfAvailableData} ${format('app.results')}`}</p>
          <AddItemButton onClick={() => { }} className="w-fit p-2">
            <AiOutlinePlus className="text-transit-white" />
          </AddItemButton>
        </Table>
      )}
    </>
  );
}

export default VehicleDetails;
