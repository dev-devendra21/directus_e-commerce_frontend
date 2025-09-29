import type { AddressData } from "./address";
import type { Product, Product_Variants } from "./product";

export interface Order {
  id: string;
  canceled_at: string;
  completed_at: string;
  status: string;
  fulfillment_status: string;
  payment_status: string;
  billing_address: AddressData;
  shipping_address: AddressData;
  customer: string;
  coupons_id: string;
  line_items: OrderItemProps[];
  date_created: string;
  subtotal: number;
}

export interface OrderItemProps {
  id: string;
  price: number;
  quantity: number;
  subtotal: number;
  tax_amount: number;
  product: Product;
  product_variant: Product_Variants;
}
