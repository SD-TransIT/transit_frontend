const costColumns = [
  { label: 'shared.shipment_number.label', accessor: 'id' },
  { label: 'shared.transporter_name.label', accessor: 'transporter_name' },
  { label: 'shared.driver_name.label', accessor: 'driver_name' },
  { label: 'shared.vehicle_number.label', accessor: 'vehicle_number' },
  { label: 'cost.transporter_base_cost.label', accessor: 'transporter_base_cost', withCommasSeparatorsFormat: true },
  { label: 'cost.transporter_additional_cost.label', accessor: 'transporter_additional_cost', withCommasSeparatorsFormat: true },
];

export default costColumns;
