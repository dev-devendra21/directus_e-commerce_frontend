import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { OrderItem } from "@/shared/components/OrderItem";
import {
  Package,
  Truck,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  CreditCard,
} from "lucide-react";
import { useSingleOrder } from "@/shared/hooks/apis/queries/useOrder";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { format } from "date-fns";

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "delivered":
      return "default";
    case "shipped":
      return "secondary";
    case "processing":
      return "secondary";
    case "cancelled":
      return "destructive";
    default:
      return "secondary";
  }
}

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: order, isLoading, isError, error } = useSingleOrder(id!);

  const goBack = () => navigate(-1);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading order details page..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>An error occurred: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Back Button */}

      <Button
        variant="ghost"
        className="flex items-center gap-2 mb-4"
        onClick={() => goBack()}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Orders
      </Button>

      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1>Order Details</h1>
          <Badge variant={getStatusColor(order.status)} className="px-3 py-1">
            {order.status}
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground">
          <span>Order #{order.id}</span>
          <span>•</span>
          <span>
            Placed on {format(order.date_created, "dd MMM yyyy, hh:mm a")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {order.line_items?.map((item: any, index: number) => (
                <div key={item.id}>
                  <OrderItem {...item} />
                  {index < order.line_items?.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge variant={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </div>
              {/* {details.estimatedDelivery && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Estimated Delivery
                  </span>
                  <span>{details.estimatedDelivery}</span>
                </div>
              )} */}
              <Separator />
              <div className="space-y-2">
                <p className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  Shipping Address
                </p>
                <div className="ml-6 space-y-1">
                  <p>{order.shipping_address?.address_line_1}</p>
                  <p>{order.shipping_address?.address_line_2}</p>
                  <p>
                    {order.shipping_address?.city},{" "}
                    {order.shipping_address?.state}{" "}
                    {order.shipping_address?.postal_code}
                  </p>
                  <p>{order.shipping_address?.country_code}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p>
                  {order.customer?.user.first_name}{" "}
                  {order.customer?.user.last_name}
                </p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  {order.customer?.user.email}
                </p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  {order.customer?.user.phone}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>&#8377; {order.subtotal?.toFixed(2) || "0.00"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    &#8377; {order.shipping_total?.toFixed(2) || "0.00"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>&#8377; {order.tax_total?.toFixed(2) || "0.00"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">discount</span>
                  <span>
                    &#8377; {order.discount_amount?.toFixed(2) || "0.00"}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>&#8377; {order.total?.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  Status: {order.payment_status}
                </p>
                <p className="text-muted-foreground">
                  Method: {order.payment_method || "N/A"}
                </p>
                <p className="text-muted-foreground">
                  Transaction ID: {order.payment_id || "N/A"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          {/* <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                Track Package
              </Button>
              <Button className="w-full" variant="outline">
                Download Invoice
              </Button>
              <Button className="w-full">Reorder Items</Button>
              {order.status.toLowerCase() === "delivered" && (
                <Button className="w-full" variant="outline">
                  Return Items
                </Button>
              )}
            </CardContent>
          </Card> */}

          {/* Billing Address */}
          {order.billing_address && (
            <Card>
              <CardHeader>
                <CardTitle>Billing Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p>{order.billing_address.address_line_1}</p>
                  <p className="text-muted-foreground">
                    {order.billing_address.address_line_2 || ""}
                  </p>
                  <p className="text-muted-foreground">
                    {order.billing_address.city}, {order.billing_address.state}{" "}
                    {order.billing_address.postal_code}
                  </p>
                  <p className="text-muted-foreground">
                    {order.billing_address.country_code}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
