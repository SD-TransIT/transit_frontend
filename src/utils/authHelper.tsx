import jwt_decode from 'jwt-decode';
import { sessionToken } from '../reducers/tokenReducer';

export default function isAuthenticated(): boolean {
  const token = localStorage.getItem(sessionToken);
  if (token) {
    const tokenJson = JSON.parse(token);
    let isValid: boolean = true;
    const dateNow = new Date();
    const epochDateNow = Math.round(dateNow.getTime() / 1000);
    const decodedToken = jwt_decode(tokenJson.access) as any;
    if (decodedToken.exp < epochDateNow) {
      isValid = false;
    }
    return isValid;
  }
  return false;
}
