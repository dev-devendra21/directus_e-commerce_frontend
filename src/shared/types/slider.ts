import type { Product } from "./product";

export interface Slider {
  id: string;
  title: string;
  description: string;
  image: string;
  products: Product;
  button_text: string;
}
