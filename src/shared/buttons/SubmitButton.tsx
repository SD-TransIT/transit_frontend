import React from 'react';
import classNames from 'classnames';
import { SubmitButtonType } from './types';

const style = 'flex justify-center items-center bg-transit-green-dark rounded text-transit-white w-full h-full';

function SubmitButton({ onClick, title = 'Add', className }: SubmitButtonType) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(style, className)}
      data-testid="add-button"
    >
      <p className="text-center">{title}</p>
    </button>
  );
}

export default SubmitButton;
