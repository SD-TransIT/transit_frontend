import React, { ForwardedRef } from 'react';

interface Props {
  className: string,
  id: string,
  name: string,
  placeholder: string,
  type: string,
}

const Input = React.forwardRef(({
  className, id, name, placeholder, type, ...props
}: Props, ref: ForwardedRef<HTMLInputElement>) => (
  <label htmlFor="floatingInput">
    <input
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      className={className}
      name={name}
      id={id}
      placeholder={placeholder}
      type={type}
      ref={ref}
    />
  </label>
));

export default Input;
