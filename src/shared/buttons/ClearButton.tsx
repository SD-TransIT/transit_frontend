import React from 'react';
import classNames from 'classnames';
import { ClearButtonType } from './types';

const style = 'p-2 flex justify-center items-center bg-transit-white rounded text-transit-green-dark w-full h-full';

function ClearButton({ onClick, title = 'Clear', className }: ClearButtonType) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(style, className)}
      data-testid="clear-button"
    >
      <p className="text-center">{title}</p>
    </button>
  );
}

export default ClearButton;