import React, { useCallback } from 'react';

import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';

import { IDriver } from 'models/driver/IDriver';
import { transporterUrl } from 'stores/sagas/transporterSaga';
import refreshAccessToken from 'stores/sagas/utils';
import { getRequest } from 'utils/apiClient';

import customStyles from './customPickerStyles';
import { TransporterPickerProp } from './types';

function TransporterPicker({ field, isInvalid }: TransporterPickerProp) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const loadOptions: LoadOptions<any, any, { page: any }> = async (
    searchQuery: any,
    loadedOptions: any,
    { page } : any,
  ) => {
    await refreshAccessToken();
    const response = await getRequest(transporterUrl, { page, searcher: searchQuery }, true);
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
      placeholder={format('driver_master.transporter.label')}
      loadOptions={loadOptions}
      additional={{
        page: 1,
      }}
      getOptionLabel={(transporter: IDriver) => transporter.name}
      getOptionValue={(transporter: any) => transporter.id}
      isClearable
      className={classNames({ 'border border-transit-red rounded': isInvalid, 'border border-transit-grey-300 rounded h-9 w-full': !isInvalid })}
      styles={customStyles}
    />
  );
}

export default TransporterPicker;
