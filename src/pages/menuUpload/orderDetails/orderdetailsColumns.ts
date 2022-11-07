const orderDetailsColumns = [
  { label: 'shared.order_number.label', accessor: 'order_details_id' },
  { label: 'shared.customer_name.name', accessor: 'customer_name' },
  { label: 'order_details.received_date.label', accessor: 'order_received_date', dateFormat: true },
];

export default orderDetailsColumns;
