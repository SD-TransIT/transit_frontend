const customPickerStyles = {
  control: (provided: any) => ({
    ...provided,
    border: 'none',
    boxShadow: 'none',
    minHeight: '100%',
    height: '100%',
    fontSize: '14px',
    overflow: 'hidden',
    outline: 'none',
    padding: '0px',
  }),
  menuList: (base: any) => ({
    ...base,
    // kill the white space on first and last option
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
  }),
};

export default customPickerStyles;
