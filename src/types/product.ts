interface TaxRates {
  code: string;
  id: string;
  rate: number;
  title: string;
}

interface Product_Variants {
  color: string;
  id: string;
  price: number;
  product: string;
  size: string;
  sku: string;
  weight: number;
  weight_unit: string;
  quantity: number;
  length: string;
  width: string;
  height: string;
  dimension_unit: string;
}

interface ParentCategory {
  id: string;
  images: {
    id: string;
    url: string;
  };
  is_active: boolean;
  parent_category?: string | null;
  sort?: string | null;
  sub_categories: string[];
  tax_rate: TaxRates;
  title: string;
}

interface ProductCategory {
  id: string;
  images: {
    id: string;
    url: string;
  };
  is_active: boolean;
  parent_category?: ParentCategory | null;
  sort?: string | null;
  sub_categories: string[];
  tax_rate: TaxRates;
  title: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  category: ProductCategory;
  thumbnail: string;
  quantity?: number;
  price: number;
  variants: Product_Variants[];
  isFeatured: boolean;
  color?: string;
}

export type { Product_Variants, ProductCategory, Product };
