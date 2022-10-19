const vehicleDetailsColumns = [
  { label: 'app.id', accessor: 'id' },
  { label: 'transporter_details.transporter_name.label', accessor: 'transport_name' },
  { label: 'shared.vehicle_number.label', accessor: 'vehicle_number' },
  { label: 'transporter_details.vehicle_volume.label', accessor: 'vehicle_capacity_volume', withCommasSeparatorsFormat: true },
  { label: 'transporter_details.vehicle_weight.label', accessor: 'vehicle_capacity_weight', withCommasSeparatorsFormat: true },
  { label: 'transporter_details.mode_of_transport.label', accessor: 'vehicle_type' },
];

export default vehicleDetailsColumns;
