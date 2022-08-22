import { DashboardPage } from '../pages/dashboard/dashboard';
import { Routes, Route } from 'react-router-dom';
import { ReportsPage } from '../pages/reports/reports';
import { ManualUploadPage } from '../pages/menuUpload/menuUpload';
import { ExcelUploadPage } from '../pages/excelUpload/excelUpload';
import { Paths } from './paths';

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
