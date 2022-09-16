import React from 'react';

import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import ShipmentForm from 'components/forms/shipment/ShipmentForm';
import PageBody from 'components/shared/PageBody';
import PageHeader from 'pages/types';
import { Paths } from 'routes/paths';

function AddShipmentPage() {
  const navigate = useNavigate();

  const onSubmitAdd = (formValues: FieldValues) => {
    console.log(formValues);
    navigate(`${Paths.shipment_details}`);
  };

  const onCancel = () => {
    navigate(`${Paths.shipment_details}`);
  };

  const onDeleteSubmitEdit = (formValues: FieldValues) => {
    console.log(formValues);
    navigate(`${Paths.shipment_details}`);
  };

  return (
    <PageBody title={PageHeader.shipment_add}>
      <ShipmentForm
        onSubmit={onSubmitAdd}
        onCancel={onCancel}
        title="New Shipment"
        initialFormValue={{}}
        mode="Add"
        submitButtonText="Add"
        onDelete={onDeleteSubmitEdit}
      />
    </PageBody>
  );
}

export default AddShipmentPage;
