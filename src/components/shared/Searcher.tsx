import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import ClearButton from '../../shared/buttons/ClearButton';
import SubmitButton from '../../shared/buttons/SubmitButton';
import SearchIcon from '../../shared/images/SearchIcon';
import Input from '../../shared/inputs/input';

interface SearcherProps {
  refetch: (params: FieldValues) => void;
}

function Searcher({ refetch }: SearcherProps) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (formValues: FieldValues) => {
    refetch(formValues);
  };

  return (
    <div className="p-32 space-x-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative inline-block w-10/12">
          <SearchIcon />
          <Input
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('search', { required: false })}
            type="search"
            id="default-search"
            className="p-2 pl-10 text-sm rounded-lg"
            placeholder="Enter Search String..."
          />
        </div>
        <div className="inline-block w-1/12">
          <ClearButton
            onClick={() => {
              reset({
                search: '',
              });
            }}
            title="Clear"
          />
        </div>
        <div className="inline-block w-1/12">
          <SubmitButton
            onClick={handleSubmit(onSubmit)}
            title="Generate"
            className="p-2"
          />
        </div>
      </form>
    </div>
  );
}

export default Searcher;
