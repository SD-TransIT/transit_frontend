import { Menu } from 'components/header/types';
import { Paths } from 'routes/paths';

const menuOptions: Menu = {
  dashboard: { id: 'dashboard', title: 'app.dashboard.label', path: Paths.dashboard },
  reports: { id: 'reports', title: 'app.reports.label', path: Paths.reports },
  manualUpload: {
    id: 'manual_upload',
    title: 'app.manual_upload.label',
    path: Paths.manual_upload,
  },
  excelUpload: {
    id: 'excel_upload',
    title: 'app.excel_upload.label',
    path: Paths.excel_upload,
  },
};

export default menuOptions;
