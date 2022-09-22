import React, { useCallback } from 'react';

import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';

import { itemUrl } from 'stores/sagas/itemSaga';
import refreshAccessToken from 'stores/sagas/utils';
import { getRequest } from 'utils/apiClient';

import { PickerProp } from './types';

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

function ItemPicker({ field, isInvalid }: PickerProp) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const loadOptions: LoadOptions<any, any, { page: any }> = async (
    searchQuery: any,
    loadedOptions: any,
    { page } : any,
  ) => {
    await refreshAccessToken();
    const response = await getRequest(itemUrl, { page, searcher: searchQuery }, true);
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
      placeholder={format('item_master.name.label')}
      loadOptions={loadOptions}
      additional={{
        page: 1,
      }}
      getOptionLabel={(item: any) => item.name}
      getOptionValue={(item: any) => item.id}
      isClearable
      className={classNames({ 'border border-transit-red rounded h-9': isInvalid, 'border border-transit-grey-300 rounded h-9': !isInvalid })}
      styles={customStyles}
    />
  );
}

export default ItemPicker;
