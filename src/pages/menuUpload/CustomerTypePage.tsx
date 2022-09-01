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
    <div className="flex flex-col m-auto p-20 gap-5">
      <div>
        <p className="text-2xl text-transit-black">Customer Type</p>
      </div>
      <div className="p-4 bg-transit-white">
        <Searcher refetch={refetch} />
      </div>
      <Table columns={columns} data={customerTypes}>
        <p>{`${customerTypes?.length} Results`}</p>
        <AddItemButton onClick={() => {}} className="w-fit p-2">
          <AiOutlinePlus className="text-transit-white" />
        </AddItemButton>
      </Table>
    </div>
  );
}

export default CustomerTypePage;
