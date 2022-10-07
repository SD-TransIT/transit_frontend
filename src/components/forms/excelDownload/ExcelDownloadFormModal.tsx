import React, { useCallback } from 'react';

import { useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';

import FormHeader from 'components/shared/FormHeader';

function ExcelDownloadFormModal({
  onClickOption, onCancel, title,
}: any) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  return (
    <div className="bg-transit-white w-full rounded-lg pt-4">
      <div className="flex flex-col gap-4 pb-4">
        <FormHeader title={title} onClick={onCancel} />
        <div className="flex flex-col gap-2 pt-4 pb-4">
          <span
            className="text-lg underline text-transit-green-secondary font-medium pb-2"
          >
            <NavLink
              to="#"
              onClick={() => onClickOption('customer_master')}
            >
              {format('customer')}
            </NavLink>
          </span>
          <span
            className="text-lg underline text-transit-green-secondary font-medium pb-2"
          >
            <NavLink
              to="#"
              onClick={() => onClickOption('item_details')}
            >
              {format('item_details')}
            </NavLink>
          </span>
          <span
            className="text-lg underline text-transit-green-secondary font-medium pb-2"
          >
            <NavLink
              to="#"
              onClick={() => onClickOption('item_master')}
            >
              {format('item')}
            </NavLink>
          </span>
          <span
            className="text-lg underline text-transit-green-secondary font-medium pb-2"
          >
            <NavLink
              to="#"
              onClick={() => onClickOption('order_details')}
            >
              {format('order_details')}
            </NavLink>
          </span>
          <span
            className="text-lg underline text-transit-green-secondary font-medium pb-2"
          >
            <NavLink
              to="#"
              onClick={() => onClickOption('supplier_master')}
            >
              {format('supplier')}
            </NavLink>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ExcelDownloadFormModal;
