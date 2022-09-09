import React from 'react';

import HeaderMenu from 'components/header/HeaderMenu';
import Logo from 'components/logo/Logo';
import Logout from 'components/logout/Logout';

function Header() {
  return (
    <div className="flex flex-row justify-between bg-transit-white h-header shadow-header px-20">
      <div className="w-1/5">
        <Logo />
      </div>
      <div className="w-3/5">
        <HeaderMenu />
      </div>
      <div className="w-1/5">
        <Logout />
      </div>
    </div>
  );
}

export default Header;
