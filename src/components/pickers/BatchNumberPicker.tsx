import React, { useCallback, useEffect, useState } from 'react';

import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';

import { itemDetailUrl } from 'stores/sagas/itemDetailSaga';
import refreshAccessToken from 'stores/sagas/utils';
import { getRequest } from 'utils/apiClient';

import customPickerStyles from './customPickerStyles';
import { BatchNumberPickerProp } from './types';

const customMenuStyle = {
  menu: (base: any) => ({
    ...base,
    width: '29%',
    position: 'fixed',
    top: 'auto',
    zIndex: '10',
  }),
};

function BatchNumberPicker({
  field, watch, onChangeBatchNumber,
}: BatchNumberPickerProp) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const [value, onChange] = useState(field);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const loadOptions: LoadOptions<any, any, { page: any }> = async (
    searchQuery: any,
    loadedOptions: any,
    { page }: any,
  ) => {
    let response: any = { results: [] };
    let isNext: boolean = false;

    if (field !== undefined) {
      await refreshAccessToken();
      response = await getRequest(itemDetailUrl, { page, searcher: `${field?.lineItem.product_name} ${searchQuery}` }, true);
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
    onChange(field);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  useEffect(() => {
    onChangeBatchNumber(value, field?.lineItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (field?.lineItem.batch_number === '' || field?.lineItem.batch_number === null || value === null) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  }, [field?.lineItem.batch_number, value]);

  return (
    <AsyncPaginate
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
      styles={{
        ...customPickerStyles,
        ...customMenuStyle,
      }}
      value={value?.batch_number !== '' && value}
      onChange={onChange}
    />
  );
}

export default BatchNumberPicker;
