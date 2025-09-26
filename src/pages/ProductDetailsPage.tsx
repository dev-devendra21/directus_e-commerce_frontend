import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, Share2, ArrowLeft, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Lens } from "@/components/magicui/lens";

import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  useRelatedProducts,
  useSingleProduct,
} from "@/hooks/apis/queries/useProducts";
import parse from "html-react-parser";
import type { Product, Product_Variants } from "@/types/product";
import { toast } from "sonner";
import { useCreateCart } from "@/hooks/apis/mutations/useCart";
import { useGetCart } from "@/hooks/apis/queries/useCart";
import useStore from "@/store/useStore";

export default function ProductDetailsPage() {
  const { isAuthenticated } = useStore();
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { refetch } = useGetCart();

  const [selectedVariant, setSelectedVariant] =
    useState<Product_Variants | null>(null);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const { data: currentProduct, isLoading } = useSingleProduct(id!);
  const categoryId = currentProduct?.category?.id;
  const { data: relatedProducts } = useRelatedProducts(categoryId!, id!);

  const { createCartMutation } = useCreateCart();

  useEffect(() => {
    if (currentProduct?.variants?.length) {
      setSelectedVariant(currentProduct.variants[0]);
      setSelectedSize(currentProduct.variants[0].size || null);
    }
  }, [currentProduct]);

  // useEffect(() => {
  //   refetch();
  // }, [selectedVariant, selectedSize, refetch, currentProduct]);

  const handleSelectSizeAndVariant = (size: string, v: Product_Variants) => {
    setSelectedSize(size);
    setSelectedVariant(v);
    setQuantity(1);
  };

  const incrementQuantity = () => {
    const currentQuantity = selectedVariant?.quantity;

    setQuantity((prev) => Math.min(currentQuantity || 0, prev + 1));
  };
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAddToCart = (
    product: Product,
    quantity: number,
    itemQuantity: number
  ) => {
    if (!isAuthenticated) {
      toast.error("Please login to add to cart");
      return;
    }

    if (itemQuantity <= 0) {
      toast.error("product out of stock");
      return;
    }
    const cartItem = {
      product: product.id,
      quantity: quantity,
      product_variant: selectedVariant?.id || product.variants[0].id,
      price: selectedVariant?.price || product.price,
    };

    createCartMutation(cartItem, {
      onSuccess: () => {
        toast.success(`${product.title} added to cart!`);
        refetch();
      },
      onError: (error) => {
        toast.error("Failed to add to cart", { description: error.message });
      },
    });
  };

  const handleShareCurrentProduct = (currentProduct: Product) => {
    const shareData = {
      title: currentProduct.title,
      text: currentProduct.description,
      url: window.location.href,
    };
    navigator.share(shareData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading product details..." />
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl mb-4">Product not found</h1>
        <Button asChild>
          <Link to="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary">
            Products
          </Link>
          <span>/</span>
          <Link
            to={`/products?category`}
            className="hover:text-primary capitalize"
          >
            {currentProduct.category.title}
          </Link>
          <span>/</span>
          <span className="text-foreground line-clamp-1">
            {currentProduct.title}
          </span>
        </div>
      </nav>

      {/* Back Button */}
      <Button variant="outline" asChild className="mb-6">
        <Link to="/products">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
      </Button>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-white rounded-lg border overflow-hidden">
            <Lens
              zoomFactor={2}
              lensSize={150}
              isStatic={false}
              ariaLabel="Zoom Area"
            >
              <ImageWithFallback
                className="w-full h-full object-contain p-8"
                src={currentProduct.thumbnail}
                alt={currentProduct.title}
              />
            </Lens>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="outline" className="mb-2 capitalize">
              {currentProduct.category.title}
            </Badge>
            <h1 className="text-3xl mb-4">{currentProduct.title}</h1>

            {/* Rating */}
            {/* <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor()
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg">{currentProduct.rating.rate}</span>
              <span className="text-muted-foreground">
                ({currentProduct.rating.count} reviews)
              </span>
            </div> */}

            {/* Price */}
            <div className="text-4xl mb-6">
              &#8377;{selectedVariant?.price || currentProduct.price}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg mb-3">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {parse(String(currentProduct.description))}
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg mb-3">Specifications</h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <span>Size:</span>
                <span className="flex items-center justify-center gap-2">
                  {currentProduct?.variants.map((v: Product_Variants) => {
                    if (!v.size) return "N/A";
                    return (
                      <span
                        key={v.id}
                        className={`h-8 w-8 border rounded-md border-black flex items-center justify-center cursor-pointer ${
                          v.size === selectedSize ? "bg-primary text-white" : ""
                        }`}
                        onClick={() => handleSelectSizeAndVariant(v.size, v)}
                      >
                        {v.size}
                      </span>
                    );
                  })}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <span>Color:</span>
                <span
                  className={`h-8 w-8 inline-block border rounded-full border-black`}
                  style={{ backgroundColor: currentProduct.color }}
                  title={currentProduct.color}
                ></span>
              </p>
              <p className="flex items-center gap-2">
                <span>Weight:</span>
                <span>
                  {selectedVariant?.weight}
                  {selectedVariant?.weight_unit}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <span>Quantity:</span>
                <span>{selectedVariant?.quantity}</span>
              </p>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div>
              <label className="text-sm mb-2 block">Quantity</label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 border rounded-md min-w-[60px] text-center">
                  {quantity}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={incrementQuantity}
                  disabled={quantity >= (selectedVariant?.quantity ?? 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() =>
                  handleAddToCart(
                    currentProduct,
                    quantity,
                    selectedVariant?.quantity ?? 0
                  )
                }
                size="lg"
                className="flex-1"
                disabled={selectedVariant?.quantity === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart - &#8377;
                {selectedVariant?.price || currentProduct.price}
              </Button>

              <Button
                onClick={() => handleShareCurrentProduct(currentProduct)}
                variant="outline"
                size="lg"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts?.length > 0 && (
        <section className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl">Related Products</h2>
            <Button variant="outline" asChild>
              <Link to={`/products?category`}>View All in</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product: Product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <Card
                  className={`group hover:shadow-lg transition-shadow overflow-hidden cursor-pointer pt-0`}
                >
                  <CardContent className={`p-0`}>
                    <div className={`relative overflow-hidden h-56`}>
                      <ImageWithFallback
                        src={product.thumbnail}
                        alt={product.title}
                        className={`object-contain bg-white group-hover:scale-105 transition-transform duration-300 w-full h-full`}
                      />
                      <Badge className="absolute top-2 left-2 bg-primary">
                        {product.variants.reduce(
                          (acc: number, variant: Product_Variants) =>
                            acc + variant.quantity,
                          0
                        ) === 0
                          ? "Out of Stock"
                          : "In Stock"}
                      </Badge>
                    </div>

                    <div className={`p-4 `}>
                      <h3
                        className={`line-clamp-2 mb-2 group-hover:text-primary transition-colors `}
                      >
                        {product.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {parse(String(product.description))}
                      </p>

                      <div className={`flex items-center justify-between `}>
                        <span className="text-2xl">
                          &#8377;{product?.price}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
