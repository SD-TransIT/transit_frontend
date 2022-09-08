import React from 'react';
import classNames from 'classnames';
import { CancelButtonType } from 'shared/buttons/types';

const style = 'cancel-button';

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
