const podVarianceColumns = [
  { label: 'app.id', accessor: 'id' },
  { label: 'pod_variance.shipment.label', accessor: 'shipment' },
  { label: 'pod_variance.description_dso.label', accessor: 'dso_type', renderFirstLetterUpperCase: true },
];

export default podVarianceColumns;
