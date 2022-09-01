import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FieldValues } from 'react-hook-form';
import { getCustomerTypeRequest } from '../../redux/actions/customerType/customerTypeActions';
import { RootState } from '../../redux/reducers/rootReducer';
import { ICustomerType } from '../../models/customerType/ICustomerType';
import Searcher from '../../components/shared/Searcher';

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

  return (
    <div>
      <div>
        <Searcher refetch={refetch} />
      </div>
      <div>
        {
          customerTypes && customerTypes.map((customer_type: ICustomerType) => (
            <div key={customer_type.id}>
              {customer_type.id}
              {' '}
              {customer_type.customer_type_name}
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default CustomerTypePage;
