import { Routes, Route } from 'react-router-dom';
import React from 'react';
import DashboardPage from '../pages/dashboard/dashboard';
import ReportsPage from '../pages/reports/reports';
import ManualUploadPage from '../pages/menuUpload/menuUpload';
import ExcelUploadPage from '../pages/excelUpload/excelUpload';
import { Paths } from './paths';
import ProtectedRoute, { ProtectedRouteProps } from './ProtectedRoute';

const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
  authenticationPath: '/login',
};

function RoutesConfig() {
  return (
    <Routes>
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
