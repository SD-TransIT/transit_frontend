import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Paths } from 'routes/paths';
import vector from 'shared/images/vector.svg';
import { sessionToken } from 'stores/reducers/tokenReducer';

function Logout() {
  const navigate = useNavigate();

  const callback = () => {
    navigate(Paths.sign_in);
  };

  const logoutUser = () => {
    localStorage.removeItem(sessionToken);
    callback();
  };

  return (
    <div className="flex justify-end h-full items-center pr-2" data-testid="logout">
      <button type="button" onClick={() => logoutUser()} className="flex flex-row gap-3">
        <img src={vector} alt="logout" className="m-auto" />
        <p>Logout</p>
      </button>
    </div>
  );
}

export default Logout;
