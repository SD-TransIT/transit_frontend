export interface IOrderDetails {
  id?: number;
  order_details_id: string;
  line_items?: object[];
  customer: number;
  order_received_date?: string;
  customer_name?: string;
}
