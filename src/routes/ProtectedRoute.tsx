import React from 'react';
import { Navigate } from 'react-router-dom';
import isAuthenticated from '../utils/authHelper';
import Header from '../components/header/Header';

export type ProtectedRouteProps = {
  authenticationPath: string;
  outlet: JSX.Element;
};

export default function ProtectedRoute({ authenticationPath, outlet }: ProtectedRouteProps) {
  if (isAuthenticated()) {
    return (
      <>
        <Header />
        {outlet}
      </>
    );
  }
  return <Navigate to={{ pathname: authenticationPath }} />;
}
