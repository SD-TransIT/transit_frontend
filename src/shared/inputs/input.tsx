import React, { ForwardedRef } from 'react';
import classNames from 'classnames';

interface Props {
  className: string,
  id: string,
  name: string,
  placeholder: string,
  type: string,
}

const style = 'border border-transit-black-light rounded w-full text-black-light focus:outline-none focus:shadow-outline h-full px-2';

const Input = React.forwardRef(({
  className, id, name, placeholder, type, ...props
}: Props, ref: ForwardedRef<HTMLInputElement>) => (
  <label htmlFor="floatingInput">
    <input
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      className={classNames(style, className)}
      name={name}
      id={id}
      placeholder={placeholder}
      type={type}
      ref={ref}
    />
  </label>
));

export default Input;
