import React, {
  useCallback, useEffect, useState,
} from 'react';

import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import DownloadButton from 'components/shared/buttons/downloadButton';
import PageBody from 'components/shared/PageBody';
import ReportTable from 'components/shared/table/ReportTable';
import { ColumnType } from 'components/shared/table/types';
import ReportsActionTypes from 'stores/actions/reports/reportsTypes';
import { RootState } from 'stores/reducers/rootReducer';
import { getReportsRequest, reportsUrl } from 'stores/sagas/reportsSaga';
import store from 'stores/store';
import columnsRender from 'utils/columnsRender';
import { reportsColumns } from 'utils/consts';

import RaportGenerator from './ReportsGenerator';
import { CurrentReportType, ReportRequestType } from './types';

function ReportsPage() {
  const [
    reportSearchVariables,
    setReportSearchVariables,
  ] = useState<CurrentReportType | undefined>(undefined);
  const [currentColumns, setCurrentColumns] = useState<any>([]);

  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const {
    reports,
  } = useSelector(
    (state: RootState) => state.reports,
  );

  // @ts-ignore
  const stateType = store.getState().reports.type;

  const getReportFailed = stateType === ReportsActionTypes.GET_REPORTS_FAILURE;

  useEffect(() => {
    const reportCurrentColumns = reportsColumns.filter(
      (reportColumns) => reportColumns.name === reportSearchVariables?.report.value,
    );
    reportCurrentColumns.map((column) => setCurrentColumns(column.columns));
  }, [reportSearchVariables]);

  const columns: ColumnType[] = React.useMemo(
    () => (columnsRender(currentColumns, format)),
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
    setReportSearchVariables(currentReportDetail);
  }, []);

  return (
    <PageBody title={format('app.reports.label')}>
      <div className="p-6 bg-transit-white">
        <RaportGenerator currentReport={handleCurrentReportDetails} />
      </div>
      <div>
        {reports && reportSearchVariables ? (
          <ReportTable columns={columns} data={reports ?? [{}]}>
            <div className="flex flex-row gap-1">
              <p className="font-medium">{reportSearchVariables?.report.label}</p>
              <p className="font-bold">
                {reports.length}
                {' '}
                {format('app.results')}
              </p>
            </div>
            <DownloadButton onClick={() => handleDownloadExcel(reportSearchVariables)} />
          </ReportTable>
        ) : (
          <div className="flex h-28 bg-transit-white justify-center items-center">
            {getReportFailed && reportSearchVariables && (
              <p className="font-normal text-base text-transit-grey-secondary">{format('report.no_reports.message')}</p>
            )}
            {!reportSearchVariables && (
              <p className="font-normal text-base text-transit-grey-secondary">{format('report.filter.message')}</p>
            )}
          </div>
        )}
      </div>
      <div />
    </PageBody>
  );
}

export default ReportsPage;
