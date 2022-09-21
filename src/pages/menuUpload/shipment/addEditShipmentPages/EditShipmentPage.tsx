import React, { useCallback } from 'react';

import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import ShipmentForm from 'components/forms/shipment/ShipmentForm';
import PageBody from 'components/shared/PageBody';
import PageHeader from 'pages/types';
import { Paths } from 'routes/paths';
import { deleteShipmentRequest } from 'stores/actions/shipment/shipmentActions';
import { DeleteShipmentRequestPayload } from 'stores/types/shipmentType';

function EditShipmentPage() {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const dataForEdit: any = location.state;

  const onCancel = () => {
    navigate(`${Paths.shipment_details}`);
  };

  const onDeleteSubmitEdit = () => {
    const paramsToPass: any = {};
    paramsToPass.id = dataForEdit.propsForEditPage[0].id;
    dispatch(deleteShipmentRequest(paramsToPass as DeleteShipmentRequestPayload));
    navigate(`${Paths.shipment_details}`);
  };

  return (
    <PageBody title={format(`${PageHeader.shipment_add}`)} onClick={onCancel} isArrow>
      <ShipmentForm
        onCancel={onCancel}
        title={format('shipment.edit.header')}
        initialFormValue={dataForEdit.propsForEditPage[0]}
        initialOrderDetails={dataForEdit.fetchedOrderDetails}
        mode="Edit"
        submitButtonText={format('app.edit')}
        onDelete={onDeleteSubmitEdit}
      />
    </PageBody>
  );
}

export default EditShipmentPage;
