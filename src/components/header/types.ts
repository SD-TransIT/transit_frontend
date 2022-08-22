import { Paths } from '../../routes/types';

export type Menu = {
  dashboard: {
    id: keyof typeof Paths;
    title: string;
    path: Paths;
  };
  reports: {
    id: keyof typeof Paths;
    title: string;
    path: Paths;
    subMenu?: {};
  };
  manualUpload: {
    id: keyof typeof Paths;
    title: string;
    path: Paths;
  };
  excelUpload: {
    id: keyof typeof Paths;
    title: string;
    path: Paths;
  };
};

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
