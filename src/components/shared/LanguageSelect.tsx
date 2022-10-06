import React, { useEffect, useState } from 'react';

import { useCookies } from 'react-cookie';
import { RiGlobalLine } from 'react-icons/ri';
import Select, { components } from 'react-select';

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    border: 'none',
    boxShadow: '0px 0px 0px 1px rgba(146, 146, 146, 0.16)',
    minHeight: '50%',
    width: '90px',
    fontSize: '14px',
    overflow: 'hidden',
    outline: 'none',
    paddingLeft: '0px',
    flexDirection: 'row-reverse',
    '&:hover': {
      boxShadow: '0px 0px 0px 1px #017E84',
      color: '#017E84',
    },
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
  singleValue: (baseSingke: any) => ({
    ...baseSingke,
    color: 'inherit',
    padding: '0px',
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    display: 'flex',
    alignContent: 'center',
    fontSize: '22px',
    color: 'inherit',
    paddingLeft: '11px',
    paddingRight: '6px',
    '&:hover': {
      color: '#017E84',
    },
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: '0px',
  }),
};

function DropdownIndicator(props: any) {
  return (
    components.DropdownIndicator && (
    // eslint-disable-next-line react/jsx-props-no-spreading
      <components.DropdownIndicator {...props}>
        <RiGlobalLine />
      </components.DropdownIndicator>
    )
  );
}

const options = [
  { value: 'en', label: 'English', shortLabel: 'ENG' },
  { value: 'fr', label: 'French', shortLabel: 'FR' },
  { value: 'pt', label: 'Portugese', shortLabel: 'PT' },
];

function LanguageSelect() {
  const [langCookies, setLangCookie] = useCookies(['language']);
  const [value, setValue] = useState(
    {
      value: langCookies?.language?.value,
      label: langCookies?.language?.shortLabel,
    },
  );

  const onLocaleChange = (event: any) => {
    setLangCookie('language', { value: event.value, label: event.label, shortLabel: event.shortLabel }, { path: '/', sameSite: true });
  };

  useEffect(() => {
    setValue({
      value: langCookies.language ? langCookies.language.value : 'en',
      label: langCookies.language ? langCookies.language?.shortLabel : 'ENG',
    });
  }, [langCookies]);

  return (
    <div className="flex items-center">
      <Select
        value={value}
        onChange={onLocaleChange}
        components={{ DropdownIndicator, IndicatorSeparator: () => null }}
        styles={customStyles}
        options={options}
      />
    </div>
  );
}

export default LanguageSelect;
