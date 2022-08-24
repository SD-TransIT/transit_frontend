import React from 'react';
import { CancelButtonType } from './types';

function CancelButton({ onClick, title = 'Cancel' }: CancelButtonType) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 bg-transit-white px-4 py-2 rounded text-transit-green-dark border border-solid border-transit-green-dark"
      data-testid="cancel-button"
    >
      <p>{title}</p>
    </button>
  );
}

export default CancelButton;
