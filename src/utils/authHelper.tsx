import jwt_decode from 'jwt-decode';

export default function isAuthenticatedProperly(): boolean {
  const isAuthenticated = !!localStorage.getItem('token');
  if (isAuthenticated) {
    const token = JSON.parse(localStorage.getItem('token') as string);
    let isValid: boolean = true;
    const dateNow = new Date();
    const epochDateNow = Math.round(dateNow.getTime() / 1000);
    const decodedToken = jwt_decode(token.access) as any;
    if (decodedToken.exp < epochDateNow) {
      isValid = false;
    }
    return isValid;
  }
  return false;
}
