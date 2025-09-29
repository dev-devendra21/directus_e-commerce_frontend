import type { Product } from "./product";

export interface TestimonialProps {
  id: string;
  product: Product;
  reviews: number;
  users: {
    first_name: string;
    last_name: string;
    avatar: string;
  };
  no_of_stars: number;
}
