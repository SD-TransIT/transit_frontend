const shipmentColumns = [
  { label: 'shared.shipment_number.label', accessor: 'id' },
  { label: 'shared.transporter_name.label', accessor: 'transporter_name' },
  { label: 'shared.driver_name.label', accessor: 'driver_name' },
  { label: 'shared.vehicle_number.label', accessor: 'vehicle_number' },
  { label: 'shipment.ship_date.label', accessor: 'ship_date', dateFormat: true },
  { label: 'shipment.expected_delivery_date.label', accessor: 'expected_delivery_date', dateFormat: true },
  { label: 'shipment.custom_route_number.label', accessor: 'custom_route_number' },
  { label: 'shipment.delay_justified.label', accessor: 'delay_justified' },
  { label: 'shipment.delivery_date.label', accessor: 'delivery_date', dateFormat: true },
  { label: 'shipment.pod_status.label', accessor: 'pod_status' },
  { label: 'shipment.pod.label', accessor: 'pod' },
  { label: 'shipment.customer_name.label', accessor: 'customer_name' },
];

export default shipmentColumns;
