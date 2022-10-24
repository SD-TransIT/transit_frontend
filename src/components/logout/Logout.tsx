import React, { useCallback } from 'react';

import vector from 'images/vector.svg';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { Paths } from 'routes/paths';
import { sessionToken } from 'stores/reducers/tokenReducer';

function Logout() {
  const navigate = useNavigate();

  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

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
        <p>{format('app.logout.label')}</p>
      </button>
    </div>
  );
}

export default Logout;
