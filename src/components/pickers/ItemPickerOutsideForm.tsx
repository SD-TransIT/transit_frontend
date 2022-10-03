import React, { useCallback, useEffect, useState } from 'react';

import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';

import { itemUrl } from 'stores/sagas/itemSaga';
import refreshAccessToken from 'stores/sagas/utils';
import { getRequest } from 'utils/apiClient';

import { ItemPickerOutsideFormProp } from './types';

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

function ItemPickerOutsideForm({ field, onChangeItemName }: ItemPickerOutsideFormProp) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const [value, onChange] = useState(field);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

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

  useEffect(() => {
    if (field?.lineItem.product_name === '' || field?.lineItem.product_name === null || value === null) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  }, [field?.lineItem.product_name, value]);

  useEffect(() => {
    onChangeItemName(value, field?.lineItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <AsyncPaginate
      key={field?.id ?? 'key'}
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
      value={value?.name !== null && value}
      onChange={onChange}
    />
  );
}

export default ItemPickerOutsideForm;
