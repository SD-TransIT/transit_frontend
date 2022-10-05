import React, { useCallback } from 'react';

import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';

import { modeOfTransportUrl } from 'stores/sagas/modeOfTransport';
import refreshAccessToken from 'stores/sagas/utils';
import { getRequest } from 'utils/apiClient';

import customPickerStyles from './customPickerStyles';
import { PickerProp } from './types';

function ModeOfTransportPicker({ field, isInvalid }: PickerProp) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const loadOptions: LoadOptions<any, any, { page: any }> = async (
    searchQuery: any,
    loadedOptions: any,
    { page } : any,
  ) => {
    await refreshAccessToken();
    const response = await getRequest(modeOfTransportUrl, { page, searcher: searchQuery }, true);
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
      placeholder={format('mode_of_transport.placeholder')}
      loadOptions={loadOptions}
      additional={{
        page: 1,
      }}
      getOptionLabel={(mode: any) => mode.vehicle_type}
      getOptionValue={(mode: any) => mode.id}
      isClearable
      className={classNames({ 'border border-transit-red rounded': isInvalid, 'border border-transit-grey-300 rounded h-9 w-full': !isInvalid })}
      styles={customPickerStyles}
    />
  );
}

export default ModeOfTransportPicker;
