import { Navigate } from 'react-router-dom';
import { isAuthenticatedProperly } from '../utils/authHelper';
import { Header } from '../components/header/Header';

export type ProtectedRouteProps = {
  authenticationPath: string;
  outlet: JSX.Element;
};
  
export default function ProtectedRoute({ authenticationPath, outlet }: ProtectedRouteProps) {
  if (isAuthenticatedProperly()) {
    return (
		<>
		  <Header />
		  {outlet}
		</>
    );
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
}
  