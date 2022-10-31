import React from 'react';

import logo from 'images/logo.jpg';

function Logo() {
  return (
    <div className="flex h-full items-center gap-2">
      <img src={logo} alt="logo" width="197px" height="64px" />
    </div>
  );
}

export default Logo;
