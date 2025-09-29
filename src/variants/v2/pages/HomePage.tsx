import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { ImageWithFallback } from "@/shared/components/figma/ImageWithFallback";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { toast } from "sonner";
import { useProducts } from "@/shared/hooks/apis/queries/useProducts";
import parse from "html-react-parser";
import { useCategories } from "@/shared/hooks/apis/queries/useCategory";
import useStore from "@/shared/store/useStore";
import Autoplay from "embla-carousel-autoplay";
import type {
  Product,
  Product_Variants,
  ProductCategory,
} from "@/shared/types/product";
import { useCreateCart } from "@/shared/hooks/apis/mutations/useCart";
import { useGetCart } from "@/shared/hooks/apis/queries/useCart";
import { CarouselSlider } from "@/shared/components/CarouselSlider";
import { useGetSlider } from "@/shared/hooks/apis/queries/useSlider";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/components/ui/carousel";

export default function HomePage() {
  const { isAuthenticated } = useStore();
  const { data: featuredProducts, isLoading } = useProducts();
  const { data: categories } = useCategories();

  const { createCartMutation } = useCreateCart();

  const { refetch } = useGetCart();

  const { data: sliders } = useGetSlider();

  const navigate = useNavigate();

  const plugin = useRef(Autoplay({ delay: 2000 }));

  const handleCardCategoryClick = (title: string) => {
    navigate("/products", {
      state: {
        categoryTitle: title,
      },
    });
  };

  const handleAddToCart = async (
    e: React.MouseEvent,
    product: Product,
    itemQuantity: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
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
      quantity: 1,
      product_variant: product.variants[0].id,
      price: product.price || product.variants[0].price,
    };
    await createCartMutation(cartItem, {
      onSuccess: () => {
        toast.success(`${product.title} added to cart!`);
        refetch();
      },

      onError: (error) => {
        toast.error("Failed to add to cart", { description: error.message });
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading ShopHub..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section>
        <CarouselSlider sliders={sliders} />
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our wide range of categories to find exactly what you're
              looking for.
            </p>
          </div>

          <div>
            <Carousel plugins={[plugin.current]} className="w-full mb-8">
              <CarouselContent className="-ml-1">
                {categories?.map((category: ProductCategory) => (
                  <CarouselItem
                    onClick={() => handleCardCategoryClick(category.title)}
                    key={category.id}
                    className="basis-1/2 md:basis-1/5 lg:basis-1/8 cursor-pointer ml-5"
                  >
                    <div className="flex flex-col items-center p-4">
                      <div className="border-primary border w-40 h-40 rounded-full">
                        <ImageWithFallback
                          src={category?.images?.id}
                          alt={category?.title}
                          className={`object-contain bg-white rounded-full w-full h-full`}
                        />
                      </div>
                      <p className="mt-2 mr-2 text-center text-primary font-medium">
                        {category.title}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background p-2 rounded-full shadow-md z-10"></CarouselPrevious>
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background p-2 rounded-full shadow-md z-10"></CarouselNext>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl mb-4">Featured Products</h2>
              <p className="text-muted-foreground">
                Handpicked products just for you
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/products">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts
              ?.filter((product: Product) => product.isFeatured === true)
              ?.map((product: Product) => (
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
                            &#8377;{product?.variants[0]?.price}
                          </span>
                          {/* <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={(e) =>
                                handleAddToCart(
                                  e,
                                  product,
                                  product.variants.reduce(
                                    (val, v) => val + v.quantity,
                                    0
                                  )
                                )
                              }
                              className="shrink-0 cursor-pointer"
                              disabled={
                                product.variants.reduce(
                                  (acc: number, variant: Product_Variants) =>
                                    acc + variant.quantity,
                                  0
                                ) <= 0
                              }
                            >
                              <ShoppingCart className="h-4 w-4" />
                            </Button>
                          </div> */}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new
            products, exclusive deals, and special offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
