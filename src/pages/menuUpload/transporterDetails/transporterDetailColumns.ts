const transporterDetailColumns = [
  { label: 'app.id', accessor: 'id' },
  { label: 'transporter.transporter_name.label', accessor: 'name' },
  { label: 'transporter.address_1.label', accessor: 'address_1' },
  { label: 'transporter.address_2.label', accessor: 'address_2' },
  { label: 'transporter.address_3.label', accessor: 'address_3' },
  { label: 'transporter.city.label', accessor: 'city' },
  { label: 'transporter.state.label', accessor: 'state' },
  { label: 'transporter.country.label', accessor: 'country' },
  { label: 'transporter.phone_number.label', accessor: 'phone' },
  { label: 'transporter.gps.label', accessor: 'latitude_longitude' },
];

export default transporterDetailColumns;
