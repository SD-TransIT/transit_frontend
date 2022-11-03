import React from 'react';

import classNames from 'classnames';
import Select from 'react-select';

import { SimpleSelectType } from './types';

function SimpleSelect({
  options,
  placeholder,
  onChange,
  isDisabled,
  ref,
  value,
  className,
  isInvalid,
  shouldDropdownBeFixed,
}: SimpleSelectType) {
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      borderColor: isInvalid ? '#E41D1D' : '#B8BBBF',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#B8BBBF',
      },
      minHeight: '100%',
      height: 'inherit',
      fontSize: '14px',
      overflow: 'hidden',
      outline: 'none',
      padding: '0px',
    }),
    menuList: (base: any) => ({
      ...base,
      padding: 0,
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected ? '#E0EEEF' : null,
      fontSize: '14px',
      color: '#333232',
      '&:hover': {
        backgroundColor: '#E0EEEF',
      },
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      display: 'flex',
      alignContent: 'center',
      height: '35px',
    }),
    menu: (base: any) => ({
      ...base,
      width: shouldDropdownBeFixed ? '22%' : '100%',
      position: shouldDropdownBeFixed ? 'fixed' : 'absolute',
      top: 'auto',
      zIndex: '10',
    }),
  };

  return (
    <Select<any>
      options={options}
      className={classNames('rounded w-full h-full', className)}
      placeholder={placeholder}
      onChange={onChange}
      styles={customStyles}
      isDisabled={isDisabled}
      ref={ref}
      value={value}
    />
  );
}

export default SimpleSelect;
