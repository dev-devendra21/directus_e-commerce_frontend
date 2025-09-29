import type { Product, Product_Variants } from "./product";

export interface CartItem {
  id: string;
  quantity: number;
  price: number;
  subtotal: number;
  product: Product;
  product_variant: Product_Variants;
}
