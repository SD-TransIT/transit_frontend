export interface IItemDetails {
  id?: number | null;
  item: number | null;
  item_name: string;
  batch_number: string;
  expiry_date?: string;
  manufacturing_date?: string;
  received_date?: string;
  gtin?: string;
  lot_number?: string;
  serial_number?: string;
  funding_source?: string;
}
