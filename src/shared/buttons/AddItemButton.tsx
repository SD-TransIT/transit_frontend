import React from 'react';

import classNames from 'classnames';
import { AddItemButtonType } from 'shared/buttons/types';

const style = 'add-item';

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
