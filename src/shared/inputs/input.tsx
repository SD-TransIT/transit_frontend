import React, { ForwardedRef } from 'react';

import classNames from 'classnames';

import { InputProps } from 'shared/inputs/types';

const style = 'text-sm border border-transit-grey-300 rounded w-full text-black-light focus:outline-none focus:shadow-outline h-full px-2';

const Input = React.forwardRef(({
  id, name, placeholder, type, className, isInvalid = false, ...props
}: InputProps, ref: ForwardedRef<HTMLInputElement>) => (
  <label htmlFor="floatingInput">
    <input
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      className={classNames({ 'border-transit-red-primary': isInvalid }, style, className)}
      name={name}
      id={id}
      placeholder={placeholder}
      type={type}
      ref={ref}
    />
  </label>
));

export default Input;
