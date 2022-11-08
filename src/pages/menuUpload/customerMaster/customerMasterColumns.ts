const customerMasterColumns = [
  { label: 'app.id', accessor: 'id' },
  { label: 'customer_master.customer_type_name.label', accessor: 'customer_type_name' },
  { label: 'customer_master.first_name.label', accessor: 'name' },
  { label: 'customer_master.first_name.label', accessor: 'first_name' },
  { label: 'customer_master.last_name.label', accessor: 'last_name' },
  { label: 'shared.address_1.label', accessor: 'address_1' },
  { label: 'shared.address_2.label', accessor: 'address_2' },
  { label: 'shared.address_3.label', accessor: 'address_3' },
  { label: 'shared.city.label', accessor: 'city' },
  { label: 'shared.state.label', accessor: 'state' },
  { label: 'shared.country.label', accessor: 'country' },
  { label: 'shared.email.label', accessor: 'email' },
  { label: 'shared.phone_number.label', accessor: 'phone' },
  { label: 'shared.gps.label', accessor: 'latitude_longitude' },
];

export default customerMasterColumns;
