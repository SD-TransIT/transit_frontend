import React from 'react';

import transitName from 'images/transitName.jpg';
import truck from 'images/truck.jpg';

function Logo() {
  return (
    <div className="flex h-full items-center gap-2">
      <img src={truck} alt="logo" width="33px" height="24px" />
      <img src={transitName} alt="logo" width="65px" height="13px" />
    </div>
  );
}

export default Logo;
