import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FieldValues } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { PostCustomerTypeRequestPayload, PutCustomerTypeRequestPayload } from '../../redux/types/customerType';
import { getCustomerTypeRequest, postCustomerTypeRequest, putCustomerTypeRequest } from '../../redux/actions/customerType/customerTypeActions';
import { RootState } from '../../redux/reducers/rootReducer';
import Searcher from '../../components/shared/Searcher';
import Table from '../../components/shared/table/Table';
import { ColumnType } from '../../components/shared/table/types';
import AddItemButton from '../../shared/buttons/AddItemButton';
import CustomerTypeForm from '../../components/forms/customerType/CustomerTypeForm';
import Dialog from '../../shared/dialog/Dialog';
import PageBody from '../../components/shared/PageBody';
import PageHeader from '../types';

function CustomerTypePage() {
  const [displayAddModal, setDisplayAddModal] = useState(false);
  const [displayEditModal, setDisplayEditModal] = useState(false);
  const [objectToEdit, setObjectToEdit] = useState({ id: null, customerTypeName: '' });

  const toggleAddModal = () => {
    setDisplayAddModal(!displayAddModal);
  };

  const toggleEditModal = (object?:FieldValues) => {
    if (object) {
      setObjectToEdit((prevState) => ({
        ...prevState,
        id: object.id,
        customerTypeName: object.customer_type_name,
      }));
    }
    setDisplayEditModal(!displayEditModal);
  };

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

  const onSubmitAdd = (formValues: FieldValues) => {
    dispatch(postCustomerTypeRequest(formValues as PostCustomerTypeRequestPayload));
    toggleAddModal();
  };

  const onSubmitEdit = (formValues: FieldValues) => {
    const paramsToPass = formValues;
    if (objectToEdit) {
      paramsToPass.id = objectToEdit.id;
    }
    dispatch(putCustomerTypeRequest(paramsToPass as PutCustomerTypeRequestPayload));
    toggleEditModal();
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
      <Dialog
        isOpen={displayAddModal}
        onClose={toggleAddModal}
        setCustomDialogContent
        // eslint-disable-next-line
        children={[
          <CustomerTypeForm
            onSubmit={onSubmitAdd}
            onCancel={toggleAddModal}
            title="New Customer Type"
            initialFormValue={{}}
          />,
        ]}
      />
      <Dialog
        isOpen={displayEditModal}
        onClose={toggleEditModal}
        setCustomDialogContent
        // eslint-disable-next-line
        children={[
          <CustomerTypeForm
            onSubmit={onSubmitEdit}
            onCancel={toggleEditModal}
            title="Edit Customer Type"
            initialFormValue={objectToEdit}
          />,
        ]}
      />
      {customerTypes === undefined ? (
        <Table columns={columns} data={[{ }]} editAction={toggleEditModal}>
          <p>0 Results</p>
          <AddItemButton onClick={toggleAddModal} className="w-fit p-2">
            <AiOutlinePlus className="text-transit-white" />
          </AddItemButton>
        </Table>
      ) : (
        <Table columns={columns} data={customerTypes} editAction={toggleEditModal}>
          <p>{`${customerTypes?.length} Results`}</p>
          <AddItemButton onClick={toggleAddModal} className="w-fit p-2">
            <AiOutlinePlus className="text-transit-white" />
          </AddItemButton>
        </Table>
      )}
    </PageBody>
  );
}

export default CustomerTypePage;
