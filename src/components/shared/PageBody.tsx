import React from 'react';
import { PageBodyType } from './types';

function PageBody({ title, children }: PageBodyType) {
  return (
    <div className="flex flex-col m-auto px-10 py-10 md:px-20 lg:px-40 gap-5">
      <div>
        <p className="text-2xl text-transit-black">{title}</p>
      </div>
      {children}
    </div>
  );
}

export default PageBody;
