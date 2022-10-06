import React from 'react';

import classNames from 'classnames';
import { IconContext } from 'react-icons';
import { RiCloseFill } from 'react-icons/ri';

import { LabelProps } from './type';

const style = 'flex justify-between text-sm border rounded text-black-light focus:outline-none focus:shadow-outline h-10 px-2';

function ReadOnlyLabel({
  textToDisplay, isInvalid = false, onClick,
}: LabelProps) {
  return (
    <div
      className={classNames({ 'border-transit-red-primary': isInvalid, 'border-transit-green-dark': !isInvalid }, style)}
    >
      <p className="inline h-full py-2">
        {textToDisplay}
      </p>
      <IconContext.Provider
        // eslint-disable-next-line
        value={{ className: 'inline h-full w-6 py-2' }}
      >
        <RiCloseFill
          onClick={onClick}
        />
      </IconContext.Provider>
    </div>
  );
}

export default ReadOnlyLabel;
