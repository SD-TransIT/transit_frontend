import React, { useCallback, useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';

import { useIntl } from 'react-intl';

import SubmitButton from 'shared/buttons/SubmitButton';

function ShipmentOrderData({
  control, register, errors, watch, setValue,
}: any) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const [displayAddModal, setDisplayAddModal] = useState(false);
  
  const toggleAddModal = () => {
    setDisplayAddModal(!displayAddModal);
  };

  const onSubmitAdd = (formValues: FieldValues) => {
    console.log('Order details');
    toggleAddModal();
  };

  return (
    <>
      <div className="flow-root">
        <p className="float-left text-[21px] text-transit-black font-semibold">Orders</p>
        <SubmitButton onClick={() => console.log('clicked')} className="float-right h-fit w-fit" title="+ Add Order" />
      </div>
      <div>
        here will be table with orders
      </div>
    </>
  );
}

export default ShipmentOrderData;
