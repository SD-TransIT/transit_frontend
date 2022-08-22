import { Paths } from '../../routes/paths';
import { Menu } from './types';

export const menuOptions: Menu = {
  dashboard: { id: 'dashboard', title: 'Dashboard', path: Paths.dashboard },
  reports: { id: 'reports', title: 'Reports', path: Paths.reports },
  manualUpload: {
    id: 'manual_upload',
    title: 'Manual Upload',
    path: Paths.manual_upload,
  },
  excelUpload: {
    id: 'excel_upload',
    title: 'Excel Upload',
    path: Paths.excel_upload,
  },
};
