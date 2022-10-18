import React, { ForwardedRef } from 'react';

import classNames from 'classnames';

import { InputProps } from 'shared/inputs/types';

const style = 'text-sm border rounded text-black-light focus:outline-none focus:shadow-outline h-9 px-2';

const Input = React.forwardRef(({
  id, name, placeholder, type, className, isInvalid = false, checked,
  disabled, onChange, defaultValue, ...props
}: InputProps, ref: ForwardedRef<HTMLInputElement>) => (
  <label htmlFor="floatingInput">
    <input
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      className={classNames({
        'border-transit-red-primary': isInvalid, 'border-transit-grey-300': !isInvalid, 'border-none': disabled || type === 'file',
      }, style, className, { 'w-full': type !== 'checkbox' })}
      name={name}
      id={id}
      placeholder={placeholder}
      type={type}
      ref={ref}
      disabled={disabled}
      onChange={onChange}
      defaultValue={defaultValue}
      checked={checked}
    />
  </label>
));

export default Input;
