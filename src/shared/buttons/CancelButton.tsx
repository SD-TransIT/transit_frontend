import React from 'react';
import classNames from 'classnames';
import { CancelButtonType } from './types';

const style = 'inline-flex items-center gap-2 bg-transit-white px-4 py-2 rounded text-transit-green-dark';

function CancelButton({ onClick, title = 'Cancel', className }: CancelButtonType) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(style, className)}
      data-testid="cancel-button"
    >
      <p>{title}</p>
    </button>
  );
}

export default CancelButton;
