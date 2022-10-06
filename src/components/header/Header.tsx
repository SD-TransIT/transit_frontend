import React from 'react';

import HeaderMenu from 'components/header/HeaderMenu';
import Logo from 'components/logo/Logo';
import Logout from 'components/logout/Logout';
import LanguageSelect from 'components/shared/LanguageSelect';

function Header() {
  return (
    <div className="flex flex-row justify-between bg-transit-white h-header shadow-header px-20">
      <div className="w-1/5">
        <Logo />
      </div>
      <div className="w-3/5">
        <HeaderMenu />
      </div>
      <div className="flex flex-row w-1/5 gap-7 justify-end">
        <LanguageSelect />
        <Logout />
      </div>
    </div>
  );
}

export default Header;
