import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/dashboard/dashboard';
import ReportsPage from '../pages/reports/reports';
import ManualUploadPage from '../pages/menuUpload/menuUpload';
import ExcelUploadPage from '../pages/excelUpload/excelUpload';
import SignInPage from '../pages/signIn/SignInPage';
import LandingPage from '../pages/landing/LandingPage';
import { Paths } from './paths';
import ProtectedRoute, { ProtectedRouteProps } from './ProtectedRoute';

const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
  authenticationPath: '/sign_in',
};

function RoutesConfig() {
  return (
    <Routes>
      <Route
        path={Paths.sign_in}
        element={<SignInPage />}
      />
      <Route
        path={Paths.landing}
        // eslint-disable-next-line react/jsx-props-no-spreading
        element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<LandingPage />} />}
      />
      <Route
        path={Paths.dashboard}
        // eslint-disable-next-line react/jsx-props-no-spreading
        element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<DashboardPage />} />}
      />
      <Route
        path={Paths.reports}
        // eslint-disable-next-line react/jsx-props-no-spreading
        element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<ReportsPage />} />}
      />
      <Route
        path={Paths.manual_upload}
        // eslint-disable-next-line react/jsx-props-no-spreading
        element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<ManualUploadPage />} />}
      />
      <Route
        path={Paths.excel_upload}
        // eslint-disable-next-line react/jsx-props-no-spreading
        element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<ExcelUploadPage />} />}
      />
    </Routes>
  );
}

export default RoutesConfig;
