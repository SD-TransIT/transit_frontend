import { Routes, Route } from 'react-router-dom';
import React from 'react';
import DashboardPage from '../pages/dashboard/dashboard';
import ReportsPage from '../pages/reports/reports';
import ManualUploadPage from '../pages/menuUpload/menuUpload';
import ExcelUploadPage from '../pages/excelUpload/excelUpload';
import { Paths } from './paths';
import SignInPage from '../pages/signIn/SignInPage';
import LandingPage from '../pages/landing/LandingPage';

function RoutesConfig() {
  return (
    <Routes>
      <Route path={Paths.landing} element={<LandingPage />} />
      <Route path={Paths.dashboard} element={<DashboardPage />} />
      <Route path={Paths.reports} element={<ReportsPage />} />
      <Route path={Paths.manual_upload} element={<ManualUploadPage />} />
      <Route path={Paths.excel_upload} element={<ExcelUploadPage />} />
      <Route path={Paths.sign_in} element={<SignInPage />} />
    </Routes>
  );
}

export default RoutesConfig;
