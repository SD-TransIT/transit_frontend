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

function CustomerTypePage() {
  const [displayModal, setDisplayModal] = useState(false);
  const [displayEditModal, setDisplayEditModal] = useState(false);
  const [objectToEdit, setObjectToEdit] = useState({ id: null, customerTypeName: '' });

  const toggleModal = () => {
    setDisplayModal(!displayModal);
  };

  const toggleEditModal = (object?:any) => {
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
    toggleModal();
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
    <div className="flex flex-col m-auto px-10 py-10 md:px-20 lg:px-40 gap-5">
      <div>
        <p className="text-2xl text-transit-black">Customer Type</p>
      </div>
      <div className="p-4 bg-transit-white">
        <Searcher refetch={refetch} />
      </div>
      <Dialog
        isOpen={displayModal}
        onClose={toggleModal}
        setCustomDialogContent
        // eslint-disable-next-line
        children={[
          <CustomerTypeForm
            onSubmit={onSubmitAdd}
            onCancel={toggleModal}
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
          <AddItemButton onClick={toggleModal} className="w-fit p-2">
            <AiOutlinePlus className="text-transit-white" />
          </AddItemButton>
        </Table>
      ) : (
        <Table columns={columns} data={customerTypes} editAction={toggleEditModal}>
          <p>{`${customerTypes?.length} Results`}</p>
          <AddItemButton onClick={toggleModal} className="w-fit p-2">
            <AiOutlinePlus className="text-transit-white" />
          </AddItemButton>
        </Table>
      )}

    </div>
  );
}

export default CustomerTypePage;
