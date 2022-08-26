<<<<<<< HEAD
import { Navigate } from 'react-router-dom';
import React from 'react';
import isAuthenticatedProperly from '../utils/authHelper';
=======
import React from 'react';
import { Navigate } from 'react-router-dom';
import isAuthenticated from '../utils/authHelper';
>>>>>>> d0a59ad5d32178430a9580eda2f8c5b917a3e76b
import Header from '../components/header/Header';

export type ProtectedRouteProps = {
  authenticationPath: string;
  outlet: JSX.Element;
};

export default function ProtectedRoute({ authenticationPath, outlet }: ProtectedRouteProps) {
<<<<<<< HEAD
  if (isAuthenticatedProperly()) {
=======
  if (isAuthenticated()) {
>>>>>>> d0a59ad5d32178430a9580eda2f8c5b917a3e76b
    return (
      <>
        <Header />
        {outlet}
      </>
    );
  }
  return <Navigate to={{ pathname: authenticationPath }} />;
}
