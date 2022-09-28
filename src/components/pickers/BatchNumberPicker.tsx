import React, { useCallback, useEffect } from 'react';

import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';

import { itemDetailUrl } from 'stores/sagas/itemDetailSaga';
import refreshAccessToken from 'stores/sagas/utils';
import { getRequest } from 'utils/apiClient';

import { BatchNumberPickerProp } from './types';

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

function BatchNumberPicker({
  field, isInvalid, isOrderDetails, watch, setValue, mode = '', initialFormValue,
}: BatchNumberPickerProp) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const loadOptions: LoadOptions<any, any, { page: any }> = async (
    searchQuery: any,
    loadedOptions: any,
    { page }: any,
  ) => {
    if (!isOrderDetails) {
      await refreshAccessToken();
      const response = await getRequest(itemDetailUrl, { page, searcher: searchQuery }, true);
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
      response = await getRequest(itemDetailUrl, { page, searcher: `${watch.name} ${searchQuery}` }, true);
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
        setValue('batch_number', null);
      } else if (watch.id.toString() !== initialFormValue.customer.id.toString()) {
        setValue('batch_number', null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, setValue]);

  return (
    <AsyncPaginate
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...field}
      key={watch?.id ?? 'null'}
      placeholder={format('item_details.batch_namber.label')}
      loadOptions={loadOptions}
      additional={{
        page: 1,
      }}
      getOptionLabel={(item: any) => item.batch_number}
      getOptionValue={(item: any) => item.id}
      isClearable
      className={classNames({ 'border border-transit-red rounded h-9': isInvalid, 'border border-transit-grey-300 rounded h-9': !isInvalid })}
      styles={customStyles}
    />
  );
}

export default BatchNumberPicker;
