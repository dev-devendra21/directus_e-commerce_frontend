import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { toast } from "sonner";
import useStore from "@/store/useStore";
import { useGetCart } from "@/hooks/apis/queries/useCart";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  useDeleteCart,
  useDeleteCartItem,
  useUpdateCartQuantity,
} from "@/hooks/apis/mutations/useCart";
import { useEffect, useState } from "react";
import type { CartItem } from "@/types/cart";

export default function CartPage() {
  const { isAuthenticated } = useStore();
  const { data: cartItems, isLoading, error, refetch } = useGetCart();
  const [carts, setCarts] = useState(cartItems || []);
  const navigate = useNavigate();

  const { updateCartQuantityMutation, isPending } = useUpdateCartQuantity();

  const { deleteCartMutation, isPending: isDeleting } = useDeleteCart();

  const { deleteCartItemMutation, isPending: isDeletingItem } =
    useDeleteCartItem();

  useEffect(() => {
    setCarts(cartItems || []);
    refetch();
  }, [cartItems, refetch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading cart page..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl mb-4">Error Loading Cart</h1>
          <p className="text-muted-foreground mb-8">
            There was an error loading your cart. Please try again.
          </p>
          <Button onClick={() => window.location.reload()}>Reload Page</Button>
        </div>
      </div>
    );
  }

  if (
    !cartItems ||
    cartItems[0]?.cart_item.length === 0 ||
    carts.length === 0
  ) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added anything to your cart yet. Start
            shopping to fill it up!
          </p>
          <Button asChild size="lg">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    updateCartQuantityMutation(
      { itemId, quantity: newQty },
      {
        onSuccess: () => {
          refetch();
          toast.success("Quantity updated successfully");
        },
        onError: (error) => {
          toast.error("Failed to update quantity", {
            description: error.message,
          });
        },
      }
    );
  };

  const handleRemoveItem = (productId: string, title: string) => {
    deleteCartItemMutation(productId, {
      onSuccess: () => {
        toast.success(`${title} removed from cart`);

        refetch();
      },
      onError: (error) => {
        toast.error("Failed to remove item", { description: error.message });
      },
    });
  };

  const handleClearCart = () => {
    deleteCartMutation(undefined, {
      onSuccess: () => {
        toast.success("Cart cleared successfully");
        refetch();
      },
      onError: (error) => {
        toast.error("Failed to clear cart", { description: error.message });
      },
    });
  };

  const handleCheckout = (id: string, subtotal: number) => {
    if (!isAuthenticated) {
      toast.error("Please login to checkout");
      navigate("/login");
      return;
    }

    navigate("/checkout", {
      state: { cartId: id, subtotal: subtotal },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {carts[0].cart_item.length}{" "}
            {carts[0].cart_item.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl">Cart Items</h2>
            <Button
              variant="outline"
              disabled={isDeleting}
              onClick={handleClearCart}
              size="sm"
            >
              Clear Cart
            </Button>
          </div>

          {carts[0].cart_item.map((item: CartItem) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-white rounded-lg border flex-shrink-0 overflow-hidden">
                    <ImageWithFallback
                      src={item?.product?.thumbnail || ""}
                      alt={item?.product?.title || "Product"}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="line-clamp-2 mb-1">
                      <Link
                        to={`/product/${item?.product?.id}`}
                        className="hover:text-primary transition-colors"
                      >
                        {item?.product?.title || "Unknown Product"}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground capitalize mb-2">
                      {item?.product?.category?.title || "Uncategorized"}
                    </p>
                    <p className="text-sm text-muted-foreground capitalize mb-2">
                      quantity in stock:{" "}
                      {item?.product_variant.quantity || "In Stock"}
                    </p>
                    <div className="text-lg">&#8377; {item?.price || 0}</div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={isDeletingItem}
                      onClick={() =>
                        handleRemoveItem(
                          item.id,
                          item?.product?.title || "Product"
                        )
                      }
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleUpdateQuantity(
                            item.id,
                            (item.quantity || 1) - 1
                          )
                        }
                        disabled={(item.quantity || 1) <= 1 || isPending}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>

                      <span className="w-8 text-center">
                        {item.quantity <= item?.product_variant?.quantity
                          ? item.quantity
                          : item?.product_variant?.quantity}
                      </span>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleUpdateQuantity(
                            item.id,
                            (item.quantity || 1) + 1
                          )
                        }
                        disabled={
                          item?.product_variant?.quantity <=
                            (item.quantity || 1) || isPending
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="text-lg">&#8377; {item.subtotal || 0}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {carts[0].cart_item.map((item: CartItem) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="line-clamp-1">
                      {item?.product?.title || "Unknown Product"} ×{" "}
                      {item.quantity <= item?.product_variant?.quantity
                        ? item.quantity
                        : item?.product_variant?.quantity || 1}
                    </span>
                    <span>&#8377; {item.subtotal || 0}</span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>&#8377; {carts[0]?.subtotal || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>&#8377; {carts[0]?.tax_total || 0}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>&#8377; {carts[0]?.total || 0}</span>
              </div>

              <Button
                onClick={() => handleCheckout(carts[0]?.id, carts[0]?.subtotal)}
                size="lg"
                className="w-full"
              >
                Proceed to Checkout
              </Button>

              <Button variant="outline" asChild className="w-full">
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
