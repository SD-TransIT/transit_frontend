import React, { useCallback } from 'react';

import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';

import { shipmentUrl } from 'stores/sagas/shipmentSaga';
import refreshAccessToken from 'stores/sagas/utils';
import { getRequest } from 'utils/apiClient';

import customPickerStyles from './customPickerStyles';
import { PickerProp } from './types';

function ShipmentPicker({
  field, isInvalid, isDisabled = false,
}: PickerProp) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const loadOptions: LoadOptions<any, any, { page: any }> = async (
    searchQuery: any,
    loadedOptions: any,
    { page } : any,
  ) => {
    await refreshAccessToken();
    const response = await getRequest(shipmentUrl, { page, searcher: searchQuery }, true);
    const isNext: boolean = response.next !== null;

    return {
      options: response.results,
      hasMore: isNext,
      additional: {
        page: page + 1,
      },
    };
  };

  return (
    <AsyncPaginate
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...field}
      placeholder={format('shipment')}
      loadOptions={loadOptions}
      additional={{
        page: 1,
      }}
      getOptionLabel={
        (shipment: any) => (shipment.customer_name ? `${shipment.id} ${shipment.customer_name}` : `${shipment.id}`)
      }
      getOptionValue={(shipment: any) => shipment.id}
      isClearable
      className={classNames({ 'border border-transit-red rounded h-9': isInvalid, 'border border-transit-grey-300 rounded h-9 w-full': !isInvalid })}
      styles={customPickerStyles}
      isDisabled={isDisabled}
    />
  );
}

export default ShipmentPicker;
