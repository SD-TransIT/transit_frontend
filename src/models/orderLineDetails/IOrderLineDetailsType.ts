export interface IOrderLineDetailsType {
  id?: number;
  order_details: string;
  product: number | null;
  item_details: number | null,
  quantity: string
  old_quantity?: string
  product_name?:string | null
  batch_number?: string
}
