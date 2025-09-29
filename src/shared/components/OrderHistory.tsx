import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Package, Eye } from "lucide-react";
import { ImageWithFallback } from "@/shared/components/figma/ImageWithFallback";
import LoadingSpinner from "./LoadingSpinner";
import { useGetAllOrders } from "@/shared/hooks/apis/queries/useOrder";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import type { CartItem } from "@/shared/types/cart";
import type { Order } from "@/shared/types/order";

export function OrderHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");

  const {
    data: orders,
    isLoading,
    isError,
    refetch,
  } = useGetAllOrders(searchQuery, filter);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch();
  };

  function handleFilter(val: string) {
    if (val === "all") {
      setFilter("");
    } else {
      setFilter(val);
    }
  }

  useEffect(() => {
    if (searchQuery === "") {
      refetch();
    }
  }, [searchQuery, refetch]);

  useEffect(() => {
    refetch();
  }, [filter, refetch]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-black text-white border-black-200";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading order page..." />
      </div>
    );
  }
  if (isError) return <div>Error loading orders</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Package className="w-6 h-6" />
          My Orders
        </h1>
        <div className="text-sm text-gray-600">
          {orders.length} orders found
        </div>
      </div>

      <main>
        <section>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 mb-4">
              <form className="flex w-full" onSubmit={handleSearch}>
                <Input
                  placeholder="Search orders..."
                  className=""
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" className="ml-2">
                  Search
                </Button>
              </form>
            </div>
            <Select
              defaultValue="all"
              onValueChange={(val) => handleFilter(val)}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>
        <section className="space-y-4">
          {orders.length === 0 && (
            <p className="text-center mt-4">No orders found</p>
          )}
          {orders.map((order: Order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-semibold">
                    Order ID: #{order.id.slice(0, 6)}
                  </span>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  {format(new Date(order.date_created), "dd/MM/yyyy")}
                </div>
              </div>

              <div className="flex justify-between mb-3">
                <div className="overflow-y-auto h-25">
                  {order.line_items.map((item: CartItem) => (
                    <>
                      <div className="flex gap-4 mb-3 ">
                        <ImageWithFallback
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.product.title}</p>
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity}
                          </p>
                          <p>
                            <span className="text-sm text-gray-600">
                              Color: {item.product.color}
                            </span>
                            <span className="text-sm text-gray-600 ml-2">
                              Size: {item.product_variant.size || "N/A"}
                            </span>
                          </p>
                          <p className="text-sm text-gray-600">
                            Price: {item.product.price}
                          </p>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹ {order.subtotal}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Link to={`/order/${order.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default OrderHistory;
