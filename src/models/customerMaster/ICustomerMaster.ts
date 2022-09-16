export interface ICustomerMaster {
  id?: number;
  name: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  address_1?: string;
  address_2?: string;
  address_3?: string;
  city?: string;
  state?: string;
  country?: string;
  latitude_longitude?: string;
  customer_type: number | undefined;
  customer_type_name: string
}
