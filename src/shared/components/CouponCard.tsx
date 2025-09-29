import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Tag, Percent, Gift } from "lucide-react";

import type { Coupon } from "@/shared/types/coupon";

interface CouponProps {
  coupon: Coupon;
  selectCoupon: (coupon: Coupon) => void;
  appliedCoupon?: Coupon;
}

const CouponCard = ({ coupon, selectCoupon, appliedCoupon }: CouponProps) => {
  const icon =
    coupon.discount_type === "percentage" ? (
      <Percent className="h-5 w-5 text-primary" />
    ) : coupon.discount_type === "flat" ? (
      <Tag className="h-5 w-5 text-primary" />
    ) : (
      <Gift className="h-5 w-5 text-primary" />
    );

  return (
    <Card
      onClick={() => selectCoupon(coupon)}
      className={`hover:border-primary cursor-pointer transition rounded-2xl w-[300px]  ${
        appliedCoupon?.id === coupon.id ? "border-primary" : ""
      } `}
    >
      <CardHeader className="flex flex-row items-center gap-2">
        {icon}
        <CardTitle className="capitalize text-[14px] font-semibold">
          {coupon.code}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-1 text-sm text-muted-foreground">
        {coupon.description && <p>{coupon.description}</p>}

        <p className="font-medium">
          {coupon.discount_type === "percentage"
            ? `${coupon.discount_value}% Off`
            : coupon.discount_type === "flat"
            ? `₹${coupon.discount_value} Off`
            : `Free Gift`}
        </p>

        <p className="text-xs">
          Expires on:{" "}
          {coupon.end_date
            ? new Date(coupon.end_date).toLocaleDateString()
            : "N/A"}
        </p>

        {coupon.status === "active" ? (
          <span className="inline-block mt-2 text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
            Active
          </span>
        ) : coupon.status === "expired" ? (
          <span className="inline-block mt-2 text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">
            Expired
          </span>
        ) : (
          <span className="inline-block mt-2 text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
            Inactive
          </span>
        )}
      </CardContent>
    </Card>
  );
};

export default CouponCard;
