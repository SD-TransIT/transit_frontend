import React from 'react';
import { SubmitButtonType } from './types';

function SubmitButton({ onClick, title = 'Add' }: SubmitButtonType) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 bg-transit-green-dark px-4 py-2 rounded text-transit-white"
      data-testid="add-button"
    >
      <p>{title}</p>
    </button>
  );
}

export default SubmitButton;
