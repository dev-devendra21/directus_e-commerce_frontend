import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CreditCard, Truck, Gift, ArrowLeft, Box } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Separator } from "@/shared/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
// import useStore from "@/store/useStore";
import { ImageWithFallback } from "@/shared/components/figma/ImageWithFallback";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { useGetProfile } from "@/shared/hooks/apis/queries/useProfile";
import AddressCard from "@/shared/components/AddressCard";
import type { AddressData } from "@/shared/types/address";
import { useNavigate } from "react-router-dom";
import { useCreateOrder } from "@/shared/hooks/apis/mutations/useOrder";
import { useGetCart } from "@/shared/hooks/apis/queries/useCart";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { toast } from "sonner";
import type { Coupon } from "@/shared/types/coupon";
import { useCoupons } from "@/shared/hooks/apis/queries/useCoupons";
import CouponCard from "@/shared/components/CouponCard";
import {
  useAddDiscountToCart,
  useUpdateCart,
} from "@/shared/hooks/apis/mutations/useCart";
import type { CartItem } from "@/shared/types/cart";

import { useRazorpay } from "react-razorpay";

import {
  createPaymentOrderApi,
  verifyPaymentApi,
} from "@/shared/apis/payments";
import { useCreateCustomerAddress } from "@/shared/hooks/apis/mutations/useCustomers";

import { getShippingCostApi } from "@/shared/apis/shipping";

export default function CheckoutPage() {
  const location = useLocation();
  const { cartId, subtotal } = location.state || {};
  const { Razorpay } = useRazorpay();

  const [paymentMethod, setPaymentMethod] = useState("prepaid");
  const [addresses, setAddresses] = useState<AddressData[]>([]);
  const [selectAddress, setSelectAddress] = useState<
    AddressData | string | null
  >("");
  const { createOrderMutation } = useCreateOrder();
  const { data: cartItems, isLoading: cartLoading, refetch } = useGetCart();
  const { updateCartMutation } = useUpdateCart();
  const { addDiscountToCartMutation } = useAddDiscountToCart();
  const { createCustomerAddressMutation } = useCreateCustomerAddress();

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const [shippingData, setShippingData] = useState([]);

  const [selectedShipping, setSelectedShipping] = useState("");

  const { data: coupons } = useCoupons(subtotal);
  const [formData, setFormData] = useState({
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    postal_code: "",
    country_code: "",
    type: "",
    address_type: "shipping",
    is_active: true,
  });

  const navigate = useNavigate();

  const { data: profile, refetch: refetchProfile } = useGetProfile();

  const razorKey = import.meta.env.VITE_RAZORPAY_KEY;

  useEffect(() => {
    if (profile) {
      setAddresses(profile[0]?.addresses || []);
    }
  }, [profile]);

  useEffect(() => {
    refetch();
  }, [appliedCoupon, refetch]);

  const handleNewAddressSubmit = (e: any) => {
    e.preventDefault();
    createCustomerAddressMutation(formData, {
      onSuccess: () => {
        toast.success("New Address added successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
    setFormData({
      address_line_1: "",
      address_line_2: "",
      city: "",
      state: "",
      postal_code: "",
      country_code: "",
      type: "",
      address_type: "shipping",
      is_active: true,
    });
  };

  const handleCouponSelect = (coupon: Coupon) => {
    setAppliedCoupon(coupon);

    addDiscountToCartMutation({
      data: {
        coupons: coupon,
        cart: cartItems[0],
      },
    });

    refetch();
  };

  const handleSetAddress = async (address: AddressData) => {
    setSelectAddress(address);
    const data = await getShippingCostApi({ addressData: address, cartId });
    setShippingData(data);
  };

  const handleShippingSelect = (
    shippingTotal: number,
    shippingId: string,
    shipping: any
  ) => {
    console.log(shipping);
    setSelectedShipping(shippingId);
    updateCartMutation({
      id: cartId || "",
      data: {
        shipping_total: shippingTotal,
        courier_name: shipping.courier_name,
        courier_company_id: shipping.courier_company_id,
      },
    });

    refetch();
  };

  const handlePlaceOrder = () => {
    createOrderMutation(
      {
        cartId: cartId || "",
        shipping_address_id: selectAddress || "",
        payment_method: paymentMethod,
      },
      {
        onSuccess: async (data) => {
          const orderId = data.orders.id;
          if (paymentMethod === "cod") return navigate(`/order/${orderId}`);

          const order = await createPaymentOrderApi({
            orderId,
          });

          const options = {
            key: razorKey,
            amount: order.amount,
            currency: order.currency,
            order_id: order.id,
            handler: async (response: any) => {
              await verifyPaymentApi({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                order_id: orderId,
              });

              navigate(`/order/${orderId}`);
            },

            prefill: {
              name: `${profile[0]?.user.first_name} ${profile[0]?.user.last_name}`,
              email: `${profile[0]?.user.email}`,
              contact: `${profile[0]?.user.phone}`,
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#0000ff",
            },
          };
          const rzp = new Razorpay(options as any);
          rzp.open();
        },
        onError: (error) => {
          toast.error("Order failed", { description: error.message });
        },
      }
    );
  };

  if (cartLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading order page..." />
      </div>
    );
  }

  if (cartItems?.length === 0) {
    return (
      <>
        <section className="bg-[#FFE8F3] w-full h-1/4 p-30">
          <h1 className="text-center text-4xl text-[#0b0b0b] font-[manrope-semibold]">
            Checkout
          </h1>
        </section>

        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Add some items to your cart before proceeding to checkout.
          </p>
          <Button asChild>
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <section className="bg-[#FFE8F3] w-full h-1/4 p-30">
        <h1 className="text-center text-4xl text-[#0b0b0b] font-[manrope-semibold]">
          Checkout
        </h1>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" asChild>
            <Link to="/cart">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl">Checkout</h1>
            <p className="text-muted-foreground">in your order</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-6">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Shipping Information{" "}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {
                  <Tabs
                    defaultValue="saved_address"
                    onValueChange={(value) => {
                      if (value === "new_address") {
                        setSelectAddress("new address");
                        refetchProfile();
                      }
                    }}
                  >
                    <TabsList>
                      <TabsTrigger
                        value="saved_address"
                        className="cursor-pointer"
                      >
                        Saved Address
                      </TabsTrigger>
                      <TabsTrigger
                        value="new_address"
                        className="cursor-pointer"
                      >
                        New Address
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="saved_address">
                      <div className="flex gap-4 flex-wrap mt-5">
                        {addresses.length > 0 ? (
                          addresses.map((address: AddressData) => (
                            <AddressCard
                              key={address.id}
                              address={address}
                              selectAddress={selectAddress as AddressData}
                              setSelectAddress={(address: AddressData | null) =>
                                handleSetAddress(address as AddressData)
                              }
                            />
                          ))
                        ) : (
                          <p>No saved addresses</p>
                        )}
                      </div>
                    </TabsContent>
                    <TabsContent value="new_address">
                      <form onSubmit={handleNewAddressSubmit}>
                        <div className="mt-5">
                          <div>
                            <Label htmlFor="type" className="my-2">
                              Type
                            </Label>
                            <Input
                              id="type"
                              value={formData.type}
                              placeholder="Home, Office etc.."
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  type: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="address_line_1" className="my-2">
                            Address Line 1
                          </Label>
                          <Input
                            id="address_line_1"
                            placeholder="123 Main Street"
                            value={formData.address_line_1}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                address_line_1: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div>
                          <Label htmlFor="address_line_2" className="my-2">
                            Address Line 2
                          </Label>
                          <Input
                            id="address_line_2"
                            placeholder="Apt 123, Suite 456"
                            value={formData.address_line_2}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                address_line_2: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="city" className="my-2">
                              City
                            </Label>
                            <Input
                              id="city"
                              placeholder="Raipur"
                              value={formData.city}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  city: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="state" className="my-2">
                              State
                            </Label>
                            <Input
                              id="state"
                              placeholder="Chhattisgarh"
                              value={formData.state}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  state: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="postal_code" className="my-2">
                              Postal Code
                            </Label>
                            <Input
                              id="postal_code"
                              placeholder="10001"
                              value={formData.postal_code}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  postal_code: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="country_code" className="my-2">
                              Country Code
                            </Label>
                            <Input
                              id="country_code"
                              placeholder="IN"
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  country_code: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>
                        <Button type="submit" className="mt-5">
                          Save
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                }
              </CardContent>
            </Card>
            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value) => setPaymentMethod(value)}
                >
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem
                      value="prepaid"
                      id="prepaid"
                      className="border-chart-2"
                    />
                    <Label htmlFor="prepaid" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Prepaid
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Pay with Razorpay to complete your payment
                      </p>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem
                      value="cod"
                      id="cod"
                      className="border-chart-2"
                    />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Box className="h-4 w-4" />
                        Cash on Delivery
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Pay with cash when your order is delivered
                      </p>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Available Coupons
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  {coupons?.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No coupons available
                    </p>
                  )}
                  {coupons?.map((coupon: Coupon) => (
                    <CouponCard
                      key={coupon.id}
                      coupon={coupon}
                      selectCoupon={handleCouponSelect}
                      appliedCoupon={appliedCoupon || undefined}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Delivery Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                {shippingData?.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Please select a shipping address
                  </p>
                ) : (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {shippingData?.map((shipping: any) => (
                      <li
                        key={shipping.id}
                        onClick={() =>
                          handleShippingSelect(
                            shipping.freight_charge,
                            shipping.id,
                            shipping
                          )
                        }
                        title="Double click to select"
                        className={`border rounded-lg p-4 flex flex-col gap-2 hover:shadow-md transition-shadow cursor-pointer ${
                          selectedShipping === shipping.id
                            ? "border-chart-2"
                            : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">
                            {shipping.courier_name}
                          </h3>
                          <span className="text-sm font-semibold text-green-600">
                            ₹{shipping.freight_charge}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>
                            ETA: {shipping.estimated_delivery_days} days
                          </span>
                          <span>Rating: {shipping.rating} ⭐</span>
                        </div>
                        {shipping.cod === 1 && (
                          <span className="text-xs text-blue-600 font-medium">
                            Cash on Delivery Available
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Your Cart Items</h4>
                  {cartItems[0]?.cart_item?.map((item: CartItem) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-12 h-12 bg-white border rounded overflow-hidden">
                        <ImageWithFallback
                          src={item?.product.thumbnail}
                          alt={item?.product.title}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm line-clamp-2">
                          {item?.product.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm">
                        &#8377;
                        {item.subtotal}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing Details */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>&#8377;{cartItems[0]?.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">
                      &#8377;{cartItems[0]?.shipping_total}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>&#8377;{cartItems[0]?.tax_total}</span>
                  </div>
                  {
                    <div className="flex justify-between text-green-600">
                      <span>Discount </span>
                      <span>
                        - &#8377;
                        {cartItems.length > 0 && cartItems[0]?.coupons_id
                          ? cartItems[0]?.coupons_id?.discount_type ===
                            "percentage"
                            ? (
                                cartItems[0].subtotal *
                                (cartItems[0]?.coupons_id?.discount_value /
                                  100 || 0)
                              ).toFixed(2)
                            : cartItems[0]?.coupons_id?.discount_value || 0
                          : 0}
                      </span>
                    </div>
                  }
                </div>

                <Separator />

                <div className="flex justify-between text-lg">
                  <span>Total</span>
                  <span>
                    &#8377;
                    {cartItems[0]?.total}
                  </span>
                </div>

                <Button onClick={handlePlaceOrder} size="lg" className="w-full">
                  Place Order
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By placing your order, you agree to our Terms of Service and
                  Privacy Policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
