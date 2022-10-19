const itemDetailColumns = [
  { label: 'app.id', accessor: 'id' },
  { label: 'shared.item_name.label', accessor: 'item_name' },
  { label: 'item_details.manufacturing_date.label', accessor: 'manufacturing_date', dateFormat: true },
  { label: 'item_details.received_date.label', accessor: 'received_date', dateFormat: true },
  { label: 'item_details.expiry_date.label', accessor: 'expiry_date', dateFormat: true },
  { label: 'item_details.batch_namber.label', accessor: 'batch_number' },
  { label: 'item_details.gtin.label', accessor: 'gtin' },
  { label: 'item_details.funding_sources.label', accessor: 'funding_source' },
  { label: 'item_details.lot_number.label', accessor: 'lot_number' },
  { label: 'item_details.serial_number.label', accessor: 'serial_number' },
];

export default itemDetailColumns;
