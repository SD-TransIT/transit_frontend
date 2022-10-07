import React, { useCallback } from 'react';

import { format as formatDate } from 'date-fns';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import PageBody from 'components/shared/PageBody';
import ReportTable from 'components/shared/table/ReportTable';
import { ColumnType } from 'components/shared/table/types';
import { RootState } from 'stores/reducers/rootReducer';
import { percentCapacityUtilizationColumns } from 'utils/consts';

import RaportGenerator from './ReportsGenerator';

function ReportsPage() {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const {
    reports,
  } = useSelector(
    (state: RootState) => state.reports,
  );

  const columns: ColumnType[] = React.useMemo(
    () => percentCapacityUtilizationColumns.map((column) => {
      if (column.label === 'app.date.label') {
        return {
          Header: format(column.label),
          accessor: column.accessor,
          Cell: ({ value }: any) => (value ? formatDate(new Date(value), 'MM/dd/yyyy') : ''),
          width: 300,
          maxWidth: 300,
        };
      }
      return {
        Header: format(column.label),
        accessor: column.accessor,
        width: 300,
        maxWidth: 300,
      };
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [format, reports],
  );

  return (
    <PageBody title={format('app.reports.label')}>
      <div className="p-4 bg-transit-white">
        <RaportGenerator />
      </div>
      <div>
        {reports ? (
          <ReportTable columns={columns} data={reports || [{}]}>
            <p>
              {reports.length}
              {' '}
              {format('app.results')}
            </p>
          </ReportTable>
        ) : (
          <div className="flex h-28 bg-transit-white justify-center items-center">
            <p className="font-normal text-base text-transit-grey-secondary">{format('report.filter.message')}</p>
          </div>
        )}
      </div>
      <div />
    </PageBody>
  );
}

export default ReportsPage;
