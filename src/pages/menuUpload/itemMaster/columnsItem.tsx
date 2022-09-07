const itemColumns = [
  {
    Header: 'Item ID',
    accessor: 'id',
    width: 80,
    maxWidth: 80,
  },
  {
    Header: 'Product Name',
    accessor: 'name',
  },
  {
    Header: 'Volume (Cubic Meters)',
    accessor: 'volume',
  },
  {
    Header: 'Cost (Local Currency)',
    accessor: 'cost',
  },
  {
    Header: 'Category',
    accessor: 'category',
  },
  {
    Header: 'Sub-Category',
    accessor: 'sub_category',
  },
  {
    Header: 'Weight (Kgs)',
    accessor: 'weight',
  },
  {
    Header: 'Ambience/Cold Chain',
    accessor: 'conditions',
  },
];

export default itemColumns;
