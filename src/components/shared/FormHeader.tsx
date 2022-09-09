import React from 'react';

import { IconContext } from 'react-icons';
import { RiCloseFill } from 'react-icons/ri';

import { FormHeaderType } from './types';

function FormHeader({ title, onClick } : FormHeaderType) {
  return (
    <div className="flex flex-row justify-between">
      <p className="float-left text-[21px] text-transit-black font-semibold">{title}</p>
      <IconContext.Provider
            // eslint-disable-next-line
            value={{ className: 'float-right h-8 w-12 justify-end' }}
      >
        <RiCloseFill onClick={onClick} />
      </IconContext.Provider>
    </div>
  );
}

export default FormHeader;
