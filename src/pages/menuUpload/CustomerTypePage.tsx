import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FieldValues } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { getCustomerTypeRequest } from '../../redux/actions/customerType/customerTypeActions';
import { RootState } from '../../redux/reducers/rootReducer';
import Searcher from '../../components/shared/Searcher';
import Table from '../../components/shared/table/Table';
import { ColumnType } from '../../components/shared/table/types';
import AddItemButton from '../../shared/buttons/AddItemButton';
import PageBody from '../../components/shared/PageBody';
import PageHeader from '../types';

function CustomerTypePage() {
  const dispatch = useDispatch();

  const {
    customerTypes,
  } = useSelector(
    (state: RootState) => state.customerType,
  );

  useEffect(() => {
    dispatch(getCustomerTypeRequest({ payload: {} }));
  }, [dispatch]);

  const refetch = (formValues: FieldValues) => {
    dispatch(getCustomerTypeRequest(formValues as any));
  };

  const columns: ColumnType[] = React.useMemo(() => [
    {
      Header: 'Id',
      accessor: 'id',
    },
    {
      Header: 'Name',
      accessor: 'customer_type_name',
    },
  ], []);

  return (
    <PageBody title={PageHeader.customer_type}>
      <div className="p-4 bg-transit-white">
        <Searcher refetch={refetch} />
      </div>
      {customerTypes === undefined ? (
        <Table columns={columns} data={[{ }]}>
          <p>0 Results</p>
          <AddItemButton onClick={() => { }} className="w-fit p-2">
            <AiOutlinePlus className="text-transit-white" />
          </AddItemButton>
        </Table>
      ) : (
        <Table columns={columns} data={customerTypes}>
          <p>{`${customerTypes?.length} Results`}</p>
          <AddItemButton onClick={() => { }} className="w-fit p-2">
            <AiOutlinePlus className="text-transit-white" />
          </AddItemButton>
        </Table>
      )}
    </PageBody>
  );
}

export default CustomerTypePage;
