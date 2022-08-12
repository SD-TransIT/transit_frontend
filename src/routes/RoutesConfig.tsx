import { DashboardPage } from '../pages/dashboard/dashboard';
import { Routes, Route } from 'react-router-dom';
import { ReportsPage } from '../pages/reports/reports';
import { ManualUploadPage } from '../pages/menuUpload/menuUpload';
import { ExcelUploadPage } from '../pages/excelUpload/excelUpload';

export enum Paths {
  dashboard = '/dashboard',
  reports = '/reports',
  manual_upload = '/manual_upload',
  excel_upload = '/excel_upload',
}

export const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" />
      <Route path={Paths.dashboard} element={<DashboardPage />} />
      <Route path={Paths.reports} element={<ReportsPage />} />
      <Route path={Paths.manual_upload} element={<ManualUploadPage />} />
      <Route path={Paths.excel_upload} element={<ExcelUploadPage />} />
    </Routes>
  );
};
