import React from 'react';

import classNames from 'classnames';

import { SubmitButtonType } from 'components/shared/buttons/types';

function SubmitButton({
  onClick, title, className, disabled = false,
}: SubmitButtonType) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames({ 'submit-button': !disabled, 'submit-disabled-button': disabled }, className)}
      data-testid="add-button"
      disabled={disabled}
    >
      <p className="text-center">{title}</p>
    </button>
  );
}

export default SubmitButton;
