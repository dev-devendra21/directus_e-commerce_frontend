import type { Order } from "@/types/order";
import axios from "../config/axiosConfig";
import store from "@/store/useStore";
import type { Coupon, couponsCustomer } from "@/types/coupon";

export const getAllCouponsApi = async (subtotal: number) => {
  const { userId } = store.getState();

  // ✅ Get all coupons
  const { data: couponsRes } = await axios.get("/items/coupons");

  // ✅ Get current customer with orders
  const { data: customerRes } = await axios.get(`/items/customers/${userId}`, {
    params: {
      fields: ["*", "orders.*"],
    },
  });

  const { orders } = customerRes.data;

  // ✅ Exclude coupons already used by this customer
  const coupons = couponsRes.data.filter((coupon: Coupon) => {
    const orderIds = orders.map((order: Order) => order.coupons_id);
    return !orderIds.includes(coupon.id);
  });

  // ✅ Get mapping of coupons <-> customers
  const { data: couponsCustomersRes } = await axios.get(
    "/items/coupons_customers"
  );
  const couponsCustomers = couponsCustomersRes.data;

  // ✅ Filtering logic
  const validCoupons = coupons.reduce((acc: Coupon[], coupon: Coupon) => {
    // Date + limit checks
    const now = new Date();
    const startDate = new Date(coupon?.start_date);
    const endDate = new Date(coupon?.end_date);

    const userLimit = orders.filter(
      (val: Order) => val?.coupons_id === coupon?.id
    ).length;

    const isActive = coupon?.status === "active";
    const isWithinDate = now >= startDate && now <= endDate;
    const usageLeft = coupon?.used_count < coupon?.usage_limit;
    const minOrderOk = subtotal >= coupon?.min_order;
    const isPerUserLimit = userLimit < coupon?.per_user_limit;

    // ✅ Common validation check
    const isCommonlyValid =
      isActive && isWithinDate && usageLeft && minOrderOk && isPerUserLimit;

    if (!isCommonlyValid) return acc; // skip invalid

    // ✅ Eligibility check
    if (coupon.customer_eligibility === "Everyone") {
      acc.push(coupon);
      return acc;
    }

    if (coupon.customer_eligibility === "Specific Customers") {
      const eligibleIds = couponsCustomers
        .filter((c: couponsCustomer) => c.coupons_id === coupon.id)
        .map((c: couponsCustomer) => c.customers_id);

      if (eligibleIds.includes(userId)) {
        acc.push(coupon);
      }
    }

    return acc;
  }, []);

  return validCoupons;
};
