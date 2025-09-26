import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { OrderItemProps } from "@/types/order";

export function OrderItem({
  price,
  quantity,
  subtotal,
  product,
  product_variant,
}: OrderItemProps) {
  return (
    <div className="flex items-center gap-4 py-4">
      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
        <ImageWithFallback
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="truncate">{product.title}</h4>
        {product_variant && (
          <p className="text-muted-foreground text-sm">{product_variant.sku}</p>
        )}
        <p className="text-muted-foreground text-sm">Qty: {quantity}</p>
      </div>

      <div className="flex-shrink-0">
        <p className="font-medium">{subtotal.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground">
          &#8377; {price.toFixed(2)} each
        </p>
      </div>
    </div>
  );
}
