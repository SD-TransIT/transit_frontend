import classNames from 'classnames';
import React from 'react';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';
import { getTransporter } from '../../redux/sagas/transporterSaga';
import refreshAccessToken from '../../redux/sagas/utils';
import { PickerProp } from './types';

function TransporterPicker({ field, isInvalid }: PickerProp) {
  const loadOptions: LoadOptions<any, any, { page: any }> = async (
    searchQuery: any,
    loadedOptions: any,
    { page } : any,
  ) => {
    await refreshAccessToken();
    const response = await getTransporter({ page, searcher: searchQuery }, true);
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
      placeholder="Transporter"
      loadOptions={loadOptions}
      additional={{
        page: 1,
      }}
      getOptionLabel={(transporter: any) => transporter.name}
      getOptionValue={(transporter: any) => transporter.id}
      isClearable
      className={classNames({ 'border border-transit-red rounded': isInvalid })}
    />
  );
}

export default TransporterPicker;
