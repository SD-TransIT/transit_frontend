import React, { useCallback, useMemo } from 'react';

import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';

import menuOptions from 'components/header/menuOptions';
import { Paths } from 'routes/paths';

const linkStyle = 'flex h-full items-center px-5 hover:bg-transit-green';

function HeaderMenu() {
  const location = useLocation();

  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const currentRoute: null | keyof typeof Paths = useMemo(() => {
    switch (true) {
      case location.pathname === Paths.dashboard: {
        return menuOptions.dashboard.id;
      }
      case location.pathname.startsWith(Paths.reports): {
        return menuOptions.reports.id;
      }
      case location.pathname.startsWith(Paths.manual_upload): {
        return menuOptions.manualUpload.id;
      }
      case location.pathname.startsWith(Paths.excel_upload): {
        return menuOptions.excelUpload.id;
      }
      default: return null;
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-row h-full justify-center">
      <div>
        <Link
          data-testid="dashboard-link"
          className={classNames(
            {
              'border-b-4 border-transit-green-dark':
                currentRoute === menuOptions.dashboard.id,
              'border-b-4 border-transparent':
                currentRoute !== menuOptions.dashboard.id,
            },
            linkStyle,
          )}
          to={menuOptions.dashboard.path}
        >
          {format(menuOptions.dashboard.title)}
        </Link>
      </div>
      <Link
        data-testid="reports-link"
        className={classNames(
          {
            'border-b-4 border-transit-green-dark':
              currentRoute === menuOptions.reports.id,
            'border-b-4 border-transparent':
              currentRoute !== menuOptions.reports.id,
          },
          linkStyle,
        )}
        to={menuOptions.reports.path}
      >
        {format(menuOptions.reports.title)}
      </Link>
      <Link
        data-testid="manual-upload-link"
        className={classNames(
          {
            'border-b-4 border-transit-green-dark':
              currentRoute === menuOptions.manualUpload.id,
            'border-b-4 border-transparent':
              currentRoute !== menuOptions.manualUpload.id,
          },
          linkStyle,
        )}
        to={menuOptions.manualUpload.path}
      >
        {format(menuOptions.manualUpload.title)}
      </Link>
      <Link
        data-testid="excel-upload-link"
        className={classNames(
          {
            'border-b-4 border-transit-green-dark':
              currentRoute === menuOptions.excelUpload.id,
            'border-b-4 border-transparent':
              currentRoute !== menuOptions.excelUpload.id,
          },
          linkStyle,
        )}
        to={menuOptions.excelUpload.path}
      >
        {format(menuOptions.excelUpload.title)}
      </Link>
    </div>
  );
}

export default HeaderMenu;
