import { IToken } from 'models/token/IToken';
import { refreshToken } from 'sagas/tokenSaga';

import { sessionToken } from 'reducers/tokenReducer';
import isAuthenticated from 'utils/authHelper';

const refreshAccessToken = async () => {
  if (isAuthenticated() === false) {
    const { refresh } = JSON.parse(localStorage.getItem(sessionToken) as string);
    const responseRefresh: { token: IToken } = await refreshToken({ refresh });
    localStorage.setItem(sessionToken, JSON.stringify(responseRefresh));
  }
};

export default refreshAccessToken;
