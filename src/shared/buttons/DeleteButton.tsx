import React from 'react';
import classNames from 'classnames';
import { DeleteButtonType } from './types';

const style = 'delete-button';

function DeleteButton({ onClick, title = 'Delete', className }: DeleteButtonType) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(style, className)}
    >
      <p>{title}</p>
    </button>
  );
}

export default DeleteButton;
