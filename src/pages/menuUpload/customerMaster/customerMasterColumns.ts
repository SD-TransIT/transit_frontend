const customerMasterColumns = [
  { label: 'app.id', accessor: 'id' },
  { label: 'customer_master.customer_type_name.label', accessor: 'customer_type_name' },
  { label: 'customer_master.name.label', accessor: 'name' },
  { label: 'customer_master.first_name.label', accessor: 'first_name' },
  { label: 'customer_master.last_name.label', accessor: 'last_name' },
  { label: 'customer_master.address_1.label', accessor: 'address_1' },
  { label: 'customer_master.address_2.label', accessor: 'address_2' },
  { label: 'customer_master.address_3.label', accessor: 'address_3' },
  { label: 'customer_master.city.label', accessor: 'city' },
  { label: 'customer_master.state.label', accessor: 'state' },
  { label: 'customer_master.country.label', accessor: 'country' },
  { label: 'customer_master.email.label', accessor: 'email' },
  { label: 'customer_master.phone.label', accessor: 'phone' },
  { label: 'customer_master.gps.label', accessor: 'latitude_longitude' },
];

export default customerMasterColumns;
