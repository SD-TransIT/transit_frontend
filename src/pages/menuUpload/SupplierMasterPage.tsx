import React, { useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import PageBody from '../../components/shared/PageBody';
import Searcher from '../../components/shared/Searcher';
import Table from '../../components/shared/table/Table';
import { ColumnType } from '../../components/shared/table/types';
import { getSupplierMasterRequest } from '../../redux/actions/supplierMaster/supplierMasterActions';
import { RootState } from '../../redux/reducers/rootReducer';
import AddItemButton from '../../shared/buttons/AddItemButton';
import PageHeader from '../types';

function SupplierMasterPage() {
  const dispatch = useDispatch();

  const {
    supplierMasters,
  } = useSelector(
    (state: RootState) => state.supplierMaster,
  );

  useEffect(() => {
    dispatch(getSupplierMasterRequest({ payload: {} }));
  }, [dispatch]);

  const refetch = (formValues: FieldValues) => {
    dispatch(getSupplierMasterRequest(formValues as any));
  };

  const columns: ColumnType[] = React.useMemo(() => [
    {
      Header: 'ID',
      accessor: 'id',
      width: 30,
      maxWidth: 30,
    },
    {
      Header: 'SupplierName',
      accessor: 'name',
    },
    {
      Header: 'Address 1',
      accessor: 'address_1',
    },
    {
      Header: 'Address 2',
      accessor: 'address_2',
    },
    {
      Header: 'Address 3',
      accessor: 'address_3',
    },
    {
      Header: 'City',
      accessor: 'city',
    },
    {
      Header: 'State',
      accessor: 'state',
    },
    {
      Header: 'Country',
      accessor: 'country',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Phone Number',
      accessor: 'phone',
    },
    {
      Header: 'GPS coordinates',
      accessor: 'latitude_longitude',
    },
  ], []);

  return (
    <PageBody title={PageHeader.supplier_master}>
      <div className="p-4 bg-transit-white">
        <Searcher refetch={refetch} />
      </div>
      {supplierMasters === undefined ? (
        <Table columns={columns} data={[{ }]} editAction={() => {}}>
          <p>0 Results</p>
          <AddItemButton onClick={() => {}} className="w-fit p-2">
            <AiOutlinePlus className="text-transit-white" />
          </AddItemButton>
        </Table>
      ) : (
        <Table
          columns={columns}
          data={supplierMasters}
          editAction={() => { }}
          deleteAction={() => { }}
        >
          <p>{`${supplierMasters?.length} Results`}</p>
          <AddItemButton onClick={() => {}} className="w-fit p-2">
            <AiOutlinePlus className="text-transit-white" />
          </AddItemButton>
        </Table>
      )}
    </PageBody>
  );
}

export default SupplierMasterPage;
