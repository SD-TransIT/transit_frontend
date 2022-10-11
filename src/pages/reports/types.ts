export type CurrentReportType = {
  report: {
    value: string,
    label: string
  },
  date_from: Date,
  date_to: Date
};

export type ReportRequestType = {
  reportName: string,
  startDate: string,
  endDate: string
};

export type ReportGeneratorType = {
  currentReport: (report: any) => void,
};
