const shipmentColumns = [
  { label: 'shipment.shipment_number.label', accessor: 'id' },
  { label: 'shipment.transporter_name.label', accessor: 'transporter_name' },
  { label: 'shipment.driver_name.label', accessor: 'driver_name' },
  { label: 'shipment.vehicle_number.label', accessor: 'vehicle_number' },
  { label: 'shipment.ship_date.label', accessor: 'ship_date' },
  { label: 'shipment.expected_delivery_date.label', accessor: 'expected_delivery_date' },
  { label: 'shipment.custom_route_number.label', accessor: 'custom_route_number' },
  { label: 'shipment.delay_justified.label', accessor: 'delay_justified' },
  { label: 'shipment.delivery_date.label', accessor: 'delivery_date' },
  { label: 'shipment.pod_status.label', accessor: 'pod_status' },
  { label: 'shipment.pod.label', accessor: 'pod' },
  { label: 'shipment.customer_name.label', accessor: 'customer_name' },
];

export default shipmentColumns;
