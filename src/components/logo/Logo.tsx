import React from 'react';

import logo from 'shared/images/logo.svg';

function Logo() {
  return (
    <div className="flex h-full items-center">
      <img src={logo} alt="logo" width="150px" height="90px" />
    </div>
  );
}

export default Logo;
