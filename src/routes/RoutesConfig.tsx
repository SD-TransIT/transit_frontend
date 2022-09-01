import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/dashboard/dashboard';
import ReportsPage from '../pages/reports/reports';
import ManualUploadPage from '../pages/menuUpload/menuUpload';
import ExcelUploadPage from '../pages/excelUpload/excelUpload';
import SignInPage from '../pages/signIn/SignInPage';
import LandingPage from '../pages/landing/LandingPage';
import ProtectedRoute from './ProtectedRoute';
import CustomerTypePage from '../pages/menuUpload/CustomerTypePage';
import { Paths } from './paths';
import Forbidden from '../components/shared/Forbidden';
import Unauthorized from '../components/shared/Unauthorized';

function RoutesConfig() {
  return (
    <Routes>
      <Route
        path={Paths.sign_in}
        element={<SignInPage />}
      />
      <Route
        path={Paths.landing}
        element={
          <ProtectedRoute authenticationPath={Paths.sign_in} outlet={<LandingPage />} />
        }
      />
      <Route
        path={Paths.dashboard}
        element={
          <ProtectedRoute authenticationPath={Paths.sign_in} outlet={<DashboardPage />} />
        }
      />
      <Route
        path={Paths.reports}
        element={
          <ProtectedRoute authenticationPath={Paths.sign_in} outlet={<ReportsPage />} />
        }
      />
      <Route
        path={Paths.manual_upload}
        element={
          <ProtectedRoute authenticationPath={Paths.sign_in} outlet={<ManualUploadPage />} />
        }
      />
      <Route
        path={Paths.customer_type}
        element={
          <ProtectedRoute authenticationPath={Paths.sign_in} outlet={<CustomerTypePage />} />
        }
      />
      <Route
        path={Paths.excel_upload}
        element={
          <ProtectedRoute authenticationPath={Paths.sign_in} outlet={<ExcelUploadPage />} />
        }
      />
      <Route
        path={Paths.unauthorized}
        element={
          <ProtectedRoute authenticationPath={Paths.sign_in} outlet={<Unauthorized />} />
          }
      />
      <Route
        path={Paths.forbidden}
        element={<Forbidden />}
      />
    </Routes>
  );
}

export default RoutesConfig;
