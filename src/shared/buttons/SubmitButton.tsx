import React, { useCallback } from 'react';

import classNames from 'classnames';

import { SubmitButtonType } from 'shared/buttons/types';
import { useIntl } from 'react-intl';

const style = 'submit-button';

function SubmitButton({ onClick, title, className }: SubmitButtonType) {

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
