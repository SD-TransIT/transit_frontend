import React from 'react';
import classNames from 'classnames';
import { AddItemButtonType } from './types';

const style = 'flex justify-center items-center bg-transit-green-dark rounded text-transit-white w-full h-full';

function AddItemButton({
  onClick, children, title = 'Add Item', className,
}: AddItemButtonType) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(style, className)}
    >
      {children}
      <p className="pl-1">{title}</p>
    </button>
  );
}

export default AddItemButton;
