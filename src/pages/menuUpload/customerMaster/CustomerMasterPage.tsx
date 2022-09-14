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
import { customerMasterUrl } from 'stores/sagas/customerMasterSaga';
import refreshAccessToken from 'stores/sagas/utils';
import { getRequest } from 'utils/apiClient';
import { DEFAULT_OFFSET, EMPTY_SEARCHER, FIRST_PAGE } from 'utils/consts';

function CustomerMasterPage() {
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
      Header: format('customer_master.customer_type_name.label'),
      accessor: 'customer_type_name',
      width: 160,
      maxWidth: 160,
    },
    {
      Header: format('customer_master.name.label'),
      accessor: 'name',
    },
    {
      Header: format('customer_master.first_name.label'),
      accessor: 'first_name',
    },
    {
      Header: format('customer_master.last_name.label'),
      accessor: 'last_name',
    },
    {
      Header: format('customer_master.address_1.label'),
      accessor: 'address_1',
    },
    {
      Header: format('customer_master.address_2.label'),
      accessor: 'address_2',
    },
    {
      Header: format('customer_master.address_3.label'),
      accessor: 'address_3',
    },
    {
      Header: format('customer_master.city.label'),
      accessor: 'city',
    },
    {
      Header: format('customer_master.state.label'),
      accessor: 'state',
    },
    {
      Header: format('customer_master.country.label'),
      accessor: 'country',
    },
    {
      Header: format('customer_master.email.label'),
      accessor: 'email',
    },
    {
      Header: format('customer_master.phone.label'),
      accessor: 'phone',
    },
    {
      Header: format('customer_master.gps.label'),
      accessor: 'latitude_longitude',
    },
  ], [format]);

  // const dispatch = useDispatch();

  const {
    customer,
  } = useSelector(
    (state: RootState) => state.customerMaster,
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
        const result = await getRequest(customerMasterUrl, {
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
    if (customer !== undefined) {
      setPage(FIRST_PAGE);
      setSearcher(EMPTY_SEARCHER);
      fetchData(FIRST_PAGE, DEFAULT_OFFSET, EMPTY_SEARCHER);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer]);

  const refetch = (formValues: any) => {
    setPage(FIRST_PAGE);
    setSearcher(formValues.search);
  };

  return (
    <PageBody title={format(PageHeader.customer_master)}>
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
    </PageBody>
  );
}

export default CustomerMasterPage;
