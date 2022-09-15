export interface IItemDetails {
  id?: number;
  item: number;
  batch_number: string;
  expiry_date?: string;
  manufacturing_date?: string;
  received_date?: string;
  gtin?: string;
  lot_number?: string;
  serial_number?: string;
  funding_source?: string;
}
