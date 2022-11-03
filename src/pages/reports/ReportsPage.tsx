import React, {
  useCallback, useEffect, useState,
} from 'react';

import { format as formatDate } from 'date-fns';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import DownloadButton from 'components/shared/buttons/downloadButton';
import PageBody from 'components/shared/PageBody';
import ReportTable from 'components/shared/table/ReportTable';
import { ColumnType } from 'components/shared/table/types';
import { RootState } from 'stores/reducers/rootReducer';
import { getReportsRequest, reportsUrl } from 'stores/sagas/reportsSaga';
import { reportsColumns } from 'utils/consts';

import RaportGenerator from './ReportsGenerator';
import { CurrentReportType, ReportRequestType } from './types';

function ReportsPage() {
  const [currentReport, setCurrentReport] = useState<CurrentReportType | undefined>(undefined);
  const [currentColumns, setCurrentColumns] = useState<any>([]);

  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const {
    reports,
  } = useSelector(
    (state: RootState) => state.reports,
  );

  useEffect(() => {
    const reportCurrentColumns = reportsColumns.filter(
      (reportColumns) => reportColumns.name === currentReport?.report.value,
    );
    reportCurrentColumns.map((column) => setCurrentColumns(column.columns));
  }, [currentReport]);

  const columns: ColumnType[] = React.useMemo(
    () => (
      currentColumns.map((
        column: {
          accessor: string, label: string, withCommasSeparatorsFormat: boolean, dateFormat: boolean
        },
      ) => {
        if (column.dateFormat) {
          return {
            Header: format(column.label),
            accessor: column.accessor,
            Cell: ({ value }: any) => (value !== 'Many' ? formatDate(new Date(value), 'MM/dd/yyyy') : 'Many'),
          };
        } if (column.withCommasSeparatorsFormat) {
          return {
            Header: format(column.label),
            accessor: column.accessor,
            Cell: ({ value }: any) => Number(value).toLocaleString('en-US', { maximumFractionDigits: 10 }),
          };
        }
        return {
          Header: format(column.label),
          accessor: column.accessor,
        };
      })
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [format, currentColumns],
  );

  const handleDownloadExcel = async (report: CurrentReportType | undefined) => {
    if (report) {
      const payload: ReportRequestType = {
        reportName: report?.report.value,
        startDate: report?.date_from.toJSON(),
        endDate: report?.date_to.toJSON(),
      };

      await getReportsRequest(reportsUrl, payload, 'xlsx').then((responseGet) => {
        const url = window.URL.createObjectURL(new Blob([responseGet as any]));
        const a = document.createElement('a');
        a.href = url;
        const reportName = report?.report.label.split(' ').join('');
        a.download = `${reportName}.xlsx`;
        a.click();
      });
    }
  };

  const handleCurrentReportDetails = useCallback((currentReportDetail: CurrentReportType) => {
    setCurrentReport(currentReportDetail);
  }, []);

  return (
    <PageBody title={format('app.reports.label')}>
      <div className="p-6 bg-transit-white">
        <RaportGenerator currentReport={handleCurrentReportDetails} />
      </div>
      <div>
        {reports && reports.length > 0 && (
          <ReportTable columns={columns} data={reports ?? [{}]}>
            <div className="flex flex-row gap-1">
              <p className="font-medium">{currentReport?.report.label}</p>
              <p className="font-bold">
                {reports.length}
                {' '}
                {format('app.results')}
              </p>
            </div>
            <DownloadButton onClick={() => handleDownloadExcel(currentReport)} />
          </ReportTable>
        )}
        {reports && reports.length === 0 && (
          <div className="flex h-28 bg-transit-white justify-center items-center">
            <p className="font-normal text-base text-transit-grey-secondary">{format('report.no_reports.message')}</p>
          </div>
        )}
        {!reports && (
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
