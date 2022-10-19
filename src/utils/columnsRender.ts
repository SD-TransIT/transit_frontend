import { format as formatDate } from 'date-fns';

const columnsRender = (columnArray: any[], format: any) => columnArray.map((column:
{ accessor: string, label: string }) => {
  if (column.accessor === 'id') {
    return {
      Header: format(column.label),
      accessor: column.accessor,
    };
  } if (
    column.accessor === 'received_date'
    || column.accessor === 'expiry_date'
    || column.accessor === 'manufacturing_date'
    || column.accessor === 'order_received_date'
    || column.accessor === 'ship_date'
    || column.accessor === 'expected_delivery_date'
    || column.accessor === 'delivery_date'
  ) {
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
  } if (column.accessor === 'volume'
    || column.accessor === 'transporter_base_cost'
    || column.accessor === 'transporter_additional_cost'
    || column.accessor === 'cost'
    || column.accessor === 'weight'
    || column.accessor === 'vehicle_capacity_volume'
    || column.accessor === 'vehicle_capacity_weight'
  ) {
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
