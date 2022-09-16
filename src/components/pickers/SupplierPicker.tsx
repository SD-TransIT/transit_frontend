import React, { useCallback } from 'react';

import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';

import { supplierUrl } from 'stores/sagas/supplierMasterSaga';
import refreshAccessToken from 'stores/sagas/utils';
import { getRequest } from 'utils/apiClient';

import { SupplierPickerProp } from './types';

function SupplierPicker({ field, isInvalid }: SupplierPickerProp) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const loadOptions: LoadOptions<any, any, { page: any }> = async (
    searchQuery: any,
    loadedOptions: any,
    { page } : any,
  ) => {
    await refreshAccessToken();
    const response = await getRequest(supplierUrl, { page, searcher: searchQuery }, true);
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
      placeholder={format('supplier_master')}
      loadOptions={loadOptions}
      additional={{
        page: 1,
      }}
      getOptionLabel={(supplier: any) => supplier.name}
      getOptionValue={(supplier: any) => supplier.id}
      isClearable
      className={classNames({ 'border border-transit-red rounded': isInvalid })}
    />
  );
}

export default SupplierPicker;
