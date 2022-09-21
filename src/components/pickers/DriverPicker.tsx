import React, { useCallback, useEffect } from 'react';

import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';

import { driverUrl } from 'stores/sagas/driverSaga';
import refreshAccessToken from 'stores/sagas/utils';
import { getRequest } from 'utils/apiClient';

import { DriverPickerProp } from './types';

function DriverPicker({
  field, isInvalid, isShipment, watch, setValue, mode = '', initialFormValue,
}: DriverPickerProp) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const loadOptions: LoadOptions<any, any, { page: any }> = async (
    searchQuery: any,
    loadedOptions: any,
    { page } : any,
  ) => {
    await refreshAccessToken();
    if (!isShipment) {
      const response = await getRequest(driverUrl, { page, searcher: searchQuery }, true);
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
      response = await getRequest(driverUrl, { page, searcher: `${watch.name} ${searchQuery}` }, true);
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
      if (mode !== 'Edit') {
        setValue('driver', null);
      } else if (watch.id.toString() !== initialFormValue.transporter.id.toString()) {
        setValue('driver', null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, setValue]);

  return (
    <AsyncPaginate
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...field}
      key={watch?.id ?? 'null'}
      placeholder={format('driver')}
      loadOptions={loadOptions}
      additional={{
        page: 1,
      }}
      getOptionLabel={(driver: any) => driver.name}
      getOptionValue={(driver: any) => driver.id}
      isClearable
      className={classNames({ 'border border-transit-red rounded': isInvalid })}
    />
  );
}

export default DriverPicker;
