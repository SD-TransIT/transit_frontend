import React, { useCallback, useEffect } from 'react';

import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';

import refreshAccessToken from 'stores/sagas/utils';
import { getRequest } from 'utils/apiClient';

import { OrderPickerProp } from './types';

function OrderPicker({
  field, isInvalid, isShipment, watch, setValue,
}: OrderPickerProp) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const loadOptions: LoadOptions<any, any, { page: any }> = async (
    searchQuery: any,
    loadedOptions: any,
    { page } : any,
  ) => {
    await refreshAccessToken();
    if (!isShipment) {
      const response = await getRequest('order_details/', { page, searcher: searchQuery }, true);
      const isNext: boolean = response.next !== null;

      return {
        options: response.results,
        hasMore: isNext,
        additional: {
          page: page + 1,
        },
      };
    }
    let response: any = { results: [] };
    let isNext: boolean = false;
    if (watch !== undefined) {
      response = await getRequest('order_details/', { page, searcher: `${watch.id} ${watch.name} ${searchQuery}` }, true);
      isNext = response.next !== null;
    }
    return {
      options: response.results,
      hasMore: isNext,
      additional: {
        page: page + 1,
      },
    };
  };

  useEffect(() => {
    if (watch !== null && watch !== undefined) {
      setValue('order_details', null);
    }
  }, [watch, setValue]);

  return (
    <AsyncPaginate
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...field}
      key={watch?.id ?? 'null'}
      placeholder={format('order_details')}
      loadOptions={loadOptions}
      additional={{
        page: 1,
      }}
      getOptionLabel={(orderDetails: any) => orderDetails.order_details_id}
      getOptionValue={(orderDetails: any) => orderDetails.order_details_id}
      isClearable
      className={classNames({ 'border border-transit-red rounded': isInvalid })}
    />
  );
}

export default OrderPicker;
