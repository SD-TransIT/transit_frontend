import { Logo } from '../logo/Logo';
import { HeaderMenu } from './HeaderMenu';

export const Header = () => {
  return (
    <div className="flex flex-row justify-between bg-transit-white h-header shadow-header px-20">
      <div className="w-1/5">
        <Logo />
      </div>
      <div className="w-3/5">
        <HeaderMenu />
      </div>
    </div>
  );
};
