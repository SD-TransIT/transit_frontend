const shipmentColumns = [
  {
    Header: 'Shipment Number',
    accessor: 'id',
    width: 100,
    maxWidth: 100,
  },
  {
    Header: 'Transporter Name',
    accessor: 'transporter_name',
  },
  {
    Header: 'Driver Name',
    accessor: 'driver_name',
  },
  {
    Header: 'Vehicle Number',
    accessor: 'vehicle_number',
  },
  {
    Header: 'Shipment Date (DD/MM/YYYY)',
    accessor: 'ship_date',
    width: 250,
    maxWidth: 250,
  },
  {
    Header: 'Expected Delivery Date (DD/MM/YYYY)',
    accessor: 'expected_delivery_date',
    width: 250,
    maxWidth: 250,
  },
  {
    Header: 'Custom Route Number',
    accessor: 'custom_route_number',
  },
  {
    Header: 'Delay Justified',
    accessor: 'delay_justified',
  },
  {
    Header: 'Delivery Date (DD/MM/YYYY)',
    accessor: 'delivery_date',
    width: 250,
    maxWidth: 250,
  },
  {
    Header: 'e-POD Status',
    accessor: 'pod_status',
  },
  {
    Header: 'Paper Based POD Received',
    accessor: 'pod',
  },
  {
    Header: 'Customer',
    accessor: 'customer_name',
  },
];

export default shipmentColumns;
