const itemMasterColumns = [
  { label: 'item_master.column.id.label', accessor: 'id' },
  { label: 'shared.product_name.label', accessor: 'name' },
  { label: 'item_master.volume.label', accessor: 'volume', withCommasSeparatorsFormat: true },
  { label: 'item_master.cost.label', accessor: 'cost', withCommasSeparatorsFormat: true },
  { label: 'item_master.category.label', accessor: 'category' },
  { label: 'item_master.sub_category.label', accessor: 'sub_category' },
  { label: 'item_master.weight.label', accessor: 'weight', withCommasSeparatorsFormat: true },
  { label: 'item_master.column.conditions.label', accessor: 'conditions' },
];

export default itemMasterColumns;
