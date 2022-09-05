import React from 'react';
import { ValidationErrorType } from './types';

function ValidationError({ value }: ValidationErrorType) {
  return (
    <span className="text-transit-red text-[11px]">
      {value}
    </span>
  );
}

export default ValidationError;
