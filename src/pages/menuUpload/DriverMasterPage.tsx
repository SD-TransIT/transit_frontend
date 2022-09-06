import React, { useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import PageBody from '../../components/shared/PageBody';
import Searcher from '../../components/shared/Searcher';
import Table from '../../components/shared/table/Table';
import { ColumnType } from '../../components/shared/table/types';
import { getDriverRequest } from '../../redux/actions/driver/driverActions';
import { RootState } from '../../redux/reducers/rootReducer';
import PageHeader from '../types';

function DriverMasterPage() {
  const dispatch = useDispatch();

  const {
    drivers,
  } = useSelector(
    (state: RootState) => state.driver,
  );

  useEffect(() => {
    dispatch(getDriverRequest({ payload: {} }));
  }, [dispatch]);

  const refetch = (formValues: FieldValues) => {
    dispatch(getDriverRequest(formValues as any));
  };

  const columns: ColumnType[] = React.useMemo(() => [
    {
      Header: 'Driver ID',
      accessor: 'id',
    },
    {
      Header: 'Transporter Name',
      accessor: 'transporter_name',
    },
    {
      Header: 'Driver Name',
      accessor: 'name',
    },
  ], []);

  return (
    <PageBody title={PageHeader.driver_master}>
      <div className="p-4 bg-transit-white">
        <Searcher refetch={refetch} />
      </div>
      {drivers === undefined ? (
        <Table
          columns={columns}
          data={[{ }]}
        >
          <p>0 Results</p>
        </Table>
      ) : (
        <Table
          columns={columns}
          data={drivers}
        >
          <p>{`${drivers?.length} Results`}</p>
        </Table>
      )}
    </PageBody>
  );
}

export default DriverMasterPage;
