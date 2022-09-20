import React, { useCallback } from 'react';

import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import ShipmentForm from 'components/forms/shipment/ShipmentForm';
import PageBody from 'components/shared/PageBody';
import PageHeader from 'pages/types';
import { Paths } from 'routes/paths';

function AddShipmentPage() {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const navigate = useNavigate();

  const onCancel = () => {
    navigate(`${Paths.shipment_details}`);
  };

  const onDeleteSubmitEdit = () => {
    navigate(`${Paths.shipment_details}`);
  };

  return (
    <PageBody title={format(`${PageHeader.shipment_add}`)} onClick={onCancel} isArrow>
      <ShipmentForm
        onCancel={onCancel}
        title={format('shipment.add_new.label')}
        initialFormValue={{}}
        mode="Add"
        submitButtonText="Add"
        onDelete={onDeleteSubmitEdit}
      />
    </PageBody>
  );
}

export default AddShipmentPage;
