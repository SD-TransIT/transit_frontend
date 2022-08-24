import Login from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { Routes, Route } from 'react-router-dom';
import { ReportsPage } from '../pages/reports/reports';
import { ManualUploadPage } from '../pages/menuUpload/menuUpload';
import { ExcelUploadPage } from '../pages/excelUpload/excelUpload';
import { Paths } from './paths';
import ProtectedRoute, { ProtectedRouteProps } from './ProtectedRoute';


const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
  authenticationPath: '/login',
};

export const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path={Paths.login} element={<Login />} />
      <Route path={Paths.dashboard} element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<DashboardPage />} />} />
      <Route path={Paths.reports} element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<ReportsPage />} />} />
      <Route path={Paths.manual_upload} element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<ManualUploadPage />} />} />
      <Route path={Paths.excel_upload} element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<ExcelUploadPage />} />}/>
    </Routes>
  );
};
