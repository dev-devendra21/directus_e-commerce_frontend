export type Coupon = {
  id: string;
  code: string;
  description?: string;
  discount_type: "percentage" | "flat" | "gift";
  discount_value: number;
  is_active: boolean;
  min_order: number;
  max_discount: number;
  usage_limit: number;
  per_user_limit: number;
  used_count: number;
  status: string;
  start_date: string;
  end_date: string;
  customer_eligibility: string;
};

export interface couponsCustomer {
  id: string;
  coupons_id: string;
  customers_id: string;
}
