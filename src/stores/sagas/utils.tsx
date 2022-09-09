import { IToken } from 'models/token/IToken';
import { sessionToken } from 'stores/reducers/tokenReducer';
import { refreshToken } from 'stores/sagas/tokenSaga';
import isAuthenticated from 'utils/authHelper';

const refreshAccessToken = async () => {
  if (isAuthenticated() === false) {
    const { refresh } = JSON.parse(localStorage.getItem(sessionToken) as string);
    const responseRefresh: { token: IToken } = await refreshToken({ refresh });
    localStorage.setItem(sessionToken, JSON.stringify(responseRefresh));
  }
};

export default refreshAccessToken;
