export interface IOrderDetails {
  id?: number;
  order_details_id: string;
  line_items?: [];
  customer: number;
  order_recived_date?: string;
  customer_name?: string;
}
