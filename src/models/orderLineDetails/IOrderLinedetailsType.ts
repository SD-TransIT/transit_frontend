export interface IOrderLineDetailsType {
  id?: number;
  order_details: string;
  product: number;
  item_details: number,
  quantity: string
  old_quantity?: string
  product_name?:string
  batch_number?: string
}
