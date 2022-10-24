import { format as formatDate } from 'date-fns';

const columnsRender = (columnArray: any[], format: any) => columnArray.map((column:
{ accessor: string, label: string, withCommasSeparatorsFormat: boolean, dateFormat: boolean }) => {
  if (column.accessor === 'id') {
    return {
      Header: format(column.label),
      accessor: column.accessor,
    };
  } if (column.dateFormat) {
    return {
      Header: format(column.label),
      accessor: column.accessor,
      Cell: ({ value }: any) => formatDate(new Date(value), 'dd/MM/yyyy'),
    };
  } if (
    column.accessor === 'delay_justified' || column.accessor === 'pod'
  ) {
    return {
      Header: format(column.label),
      accessor: column.accessor,
      Cell: ({ value }: any) => (value ? value.toString() : 'false'),
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
});

export default columnsRender;
