import React, { useCallback, useEffect } from 'react';

import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';

import refreshAccessToken from 'stores/sagas/utils';
import { getRequest } from 'utils/apiClient';

import { TransporterDetailsPickerProp } from './types';

const transporterDetails = 'transporter_details/';

function TransporterDetailsPicker({
  field, isInvalid, isShipment, watch, setValue,
}: TransporterDetailsPickerProp) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const loadOptions: LoadOptions<any, any, { page: any }> = async (
    searchQuery: any,
    loadedOptions: any,
    { page } : any,
  ) => {
    await refreshAccessToken();
    if (!isShipment) {
      const response = await getRequest(transporterDetails, { page, searcher: searchQuery }, true);
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
      response = await getRequest(transporterDetails, { page, searcher: `${watch.name} ${searchQuery}` }, true);
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
      setValue('transporter_details', null);
    }
  }, [watch, setValue]);

  return (
    <AsyncPaginate
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...field}
      key={watch?.id ?? 'null'}
      placeholder={format('transporter_details')}
      loadOptions={loadOptions}
      additional={{
        page: 1,
      }}
      getOptionLabel={(transporter_details: any) => transporter_details.vehicle_number}
      getOptionValue={(transporter_details: any) => transporter_details.id}
      isClearable
      className={classNames({ 'border border-transit-red rounded': isInvalid })}
    />
  );
}

export default TransporterDetailsPicker;
