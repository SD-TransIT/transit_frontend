import React from 'react';

import Select from 'react-select';

import { SimpleSelectType } from './types';

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    borderColor: '#B8BBBF',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#B8BBBF',
    },
    fontSize: '14px',
    overflow: 'hidden',
    outline: 'none',
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: 'transit-black',
    fontSize: 14,
  }),
};

function SimpleSelect({
  options, placeholder, onChange, isDisabled,
}: SimpleSelectType) {
  return (
    <Select<any>
      options={options}
      className="rounded w-full h-full"
      placeholder={placeholder}
      onChange={onChange}
      styles={customStyles}
      isDisabled={isDisabled}
    />
  );
}

export default SimpleSelect;
