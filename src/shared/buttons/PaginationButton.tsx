import React from 'react';
import classNames from 'classnames';
import { PaginationButtonType } from 'types';

const style = 'pagination-button';

function PaginationButton({
  onClick, children, disabled = false, className,
}: PaginationButtonType) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(style, className)}
      disabled={disabled}
    >
      <div className="m-auto px-1">
        {children}
      </div>
    </button>
  );
}

export default PaginationButton;
