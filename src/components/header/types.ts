import { Paths } from 'routes/paths';

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
