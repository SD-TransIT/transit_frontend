import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Paths } from '../../routes/RoutesConfig';

type Menu = {
  dashboard: {
    title: string;
  };
  reports: {
    title: string;
  };
  manualUpload: {
    title: string;
  };
  excelUpload: {
    title: string;
  };
};

const menuOptions: Menu = {
  dashboard: { title: 'Dashboard' },
  reports: { title: 'Reports' },
  manualUpload: { title: 'Manual Upload' },
  excelUpload: { title: 'Excel Upload' },
};

const linkStyle = 'flex h-full items-center px-5 hover:bg-transit-green';

export const HeaderMenu = () => {
  const location = useLocation();

  const currentRoute: null | keyof typeof Paths = useMemo(() => {
    switch (true) {
      case location.pathname.startsWith(Paths.dashboard): {
        return 'dashboard';
      }
      case location.pathname.startsWith(Paths.reports): {
        return 'reports';
      }
      case location.pathname.startsWith(Paths.manual_upload): {
        return 'manual_upload';
      }
      case location.pathname.startsWith(Paths.excel_upload): {
        return 'excel_upload';
      }
    }

    return null;
  }, [location.pathname]);

  return (
    <div className="flex flex-row h-full">
      <div>
        <Link
          data-testid="dashboard-link"
          className={classNames(
            {
              'border-b-4 border-transit-green-dark':
                currentRoute === 'dashboard',
              'border-b-4 border-transparent': currentRoute !== 'dashboard',
            },
            linkStyle,
          )}
          to="/dashboard"
        >
          {menuOptions.dashboard.title}
        </Link>
      </div>
      <Link
        data-testid="reports-link"
        className={classNames(
          {
            'border-b-4 border-transit-green-dark': currentRoute === 'reports',
            'border-b-4 border-transparent': currentRoute !== 'reports',
          },
          linkStyle,
        )}
        to="/reports"
      >
        {menuOptions.reports.title}
      </Link>
      <Link
        data-testid="manual-upload-link"
        className={classNames(
          {
            'border-b-4 border-transit-green-dark':
              currentRoute === 'manual_upload',
            'border-b-4 border-transparent': currentRoute !== 'manual_upload',
          },
          linkStyle,
        )}
        to="/manual_upload"
      >
        {menuOptions.manualUpload.title}
      </Link>
      <Link
        data-testid="excel-upload-link"
        className={classNames(
          {
            'border-b-4 border-transit-green-dark':
              currentRoute === 'excel_upload',
            'border-b-4 border-transparent': currentRoute !== 'excel_upload',
          },
          linkStyle,
        )}
        to="/excel_upload"
      >
        {menuOptions.excelUpload.title}
      </Link>
    </div>
  );
};
