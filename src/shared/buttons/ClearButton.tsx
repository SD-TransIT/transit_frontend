import React from 'react';

import classNames from 'classnames';
import { ClearButtonType } from 'shared/buttons/types';

const style = 'clear-button';

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
