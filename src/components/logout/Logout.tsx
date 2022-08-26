import React from 'react';
import { useNavigate } from 'react-router-dom';
import vector from '../../shared/images/vector.svg';

function Logout() {
  const navigate = useNavigate();

  const callback = () => {
    navigate('/sign_in');
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
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
