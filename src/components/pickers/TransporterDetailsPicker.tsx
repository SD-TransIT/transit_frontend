import React, { useCallback, useEffect } from 'react';

import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';

import { transporterDetailsUrl } from 'stores/sagas/transporterDetailsSaga';
import refreshAccessToken from 'stores/sagas/utils';
import { getRequest } from 'utils/apiClient';

import { TransporterDetailsPickerProp } from './types';

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    background: '#fff',
    border: 'none',
    minHeight: '34px',
    height: '34px',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#B8BBBF',
    },
    fontSize: '14px',
    overflow: 'hidden',
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#9ca3af',
    fontSize: 14,
  }),
};

function TransporterDetailsPicker({
  field, isInvalid, isShipment, watch, setValue, mode = '', initialFormValue,
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
      const response = await getRequest(
        transporterDetailsUrl,
        { page, searcher: searchQuery },
        true,
      );
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
      response = await getRequest(transporterDetailsUrl, { page, searcher: `${watch.name} ${searchQuery}` }, true);
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
        setValue('transporter_details', null);
      } else if (watch.id.toString() !== initialFormValue.transporter.id.toString()) {
        setValue('transporter_details', null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      className={classNames({ 'border border-transit-red rounded h-9': isInvalid, 'border border-transit-grey-300 rounded h-9 w-full': !isInvalid })}
      styles={customStyles}
    />
  );
}

export default TransporterDetailsPicker;
