import React from 'react';

import { IconContext } from 'react-icons';
import { RiArrowLeftSLine } from 'react-icons/ri';

import { PageBodyType } from 'components/shared/types';

function PageBody({
  title, children, onClick, isArrow = false,
}: PageBodyType) {
  return (
    <div className="flex flex-col m-auto px-10 py-10 md:px-20 lg:px-40 gap-5 min-h-screen h-full">
      <div onClick={onClick} role="presentation" className="inline-block">
        <p className="text-2xl text-transit-black">
          {
            isArrow === true ? (
              <IconContext.Provider
            // eslint-disable-next-line
            value={{ className: 'inline scale-125' }}><RiArrowLeftSLine /></IconContext.Provider>
            ) : ''
          }
          {' '}
          {title}
        </p>
      </div>
      {children}
    </div>
  );
}

export default PageBody;
