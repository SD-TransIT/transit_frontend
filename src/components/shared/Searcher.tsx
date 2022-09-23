import React, { useCallback } from 'react';

import { FieldValues, useForm } from 'react-hook-form';
import { FiSearch } from 'react-icons/fi';
import { useIntl } from 'react-intl';

import ClearButton from 'shared/buttons/ClearButton';
import SubmitButton from 'shared/buttons/SubmitButton';
import Input from 'shared/inputs/input';

interface SearcherProps {
  refetch: (params: FieldValues) => void;
}

function Searcher({ refetch }: SearcherProps) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const onSubmit = (formValues: FieldValues) => {
    refetch(formValues);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row justify-between gap-4">
          <div className="relative inline-block w-full">
            <div className="inline-block flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <FiSearch />
            </div>
            <Input
            // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('search', { required: false })}
              type="search"
              id="default-search"
              className="h-fit p-3 pl-10 text-sm rounded-lg"
              placeholder={format('search.placeholder')}
            />
          </div>
          <div className="flex flex-row gap-4">
            <ClearButton
              onClick={() => {
                reset({
                  search: '',
                });
                refetch({});
              }}
            />
            <SubmitButton
              onClick={handleSubmit(onSubmit)}
              title={format('search.generate')}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Searcher;
